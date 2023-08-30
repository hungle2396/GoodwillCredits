const express = require('express');
const router = express.Router();
const checkPermission = require('../middlewares/checkPermision');
const {User, Event, UserEvent, Task} = require('../models/index');


// Get all the tasks (restricted to admin users)
router.get('/', checkPermission('Admin'), async (req, res) => {
    try {
        const tasks = await Task.findAll();
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({
            error: 'Internal server error'
        })
    }
});

// Get all the tasks related to an event
router.get('/event/:eventId', async (req, res) => {
    try {
        const userId = req.user.id;
        const eventId = req.params.eventId;
        
        // Find the host of the event
        const event = await Event.findByPk(eventId);

        if (!event) {
            return res.status(404).json({
                error: 'Event does not exist'
            })
        };

        const isHost = event.hostId === userId;

        let tasks = [];

        // Find all tasks in the event and participants
        if (isHost) {
            tasks = await Task.findAll({
                where: {
                    eventId: eventId,
                    status: 'Pending'
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['firstName', 'lastName']
                    }
                ]
            })
        } else {
            tasks = await Task.findAll({
                where: {
                    eventId: eventId,
                    userId: userId
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['firstName', 'lastName']
                    }
                ]
            })
        }

        if (tasks.length === 0) {
            return res.status(200).json({
                message: 'Empty submitted Tasks'
            })
        };

        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({
            error: 'An error occured'
        })
    }
});

// Add task (restrcited to host and user's own account)
router.post('/', async (req, res) => {
    try {
        const {
            participantId,
            eventId,
            description, 
            transactionType,
            credits
        } = req.body;

        const userId = req.user.id;

        const event = await Event.findByPk(eventId);

        if (!event) {
            return res.status(404).json({
                error: 'Event does not exist.'
            })
        }

        const isHost = event.hostId === userId;

        const participant = await UserEvent.findOne({
            where: {
                userId: participantId,
                eventId: eventId
            }
        });

        if (!participant) {
            return res.status(404).json({
                error: 'User does not exist in this event.'
            })
        }

        // Check if the user has the permission to create task
        if (!isHost && participant.userId !== userId) {
            return res.status(403).json({
                error: 'You are not authorized to access this resource.'
            });
        }

        // Create new task
        const task = await Task.create({
            userId,
            eventId,
            description,
            transactionType,
            credits,
            status: 'Pending'
        });

        // Adding and Substracting the participant's total credits
        if (isHost) {
            task.status = 'Approved';

            await task.save();

            if (transactionType === 'Add') {
                participant.totalCredits += credits;
            }
    
            if (transactionType === 'Substract') {
                participant.totalCredits -= credits
            }

            await participant.save();
        }
        

        return res.status(200).json({
            message: `Successfully submitted credits`
        });

    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
});

// Task Approval (Restricted to Host)
router.post('/approval/:taskId', async (req, res) => {
    try {
        const userId = req.user.id;
        const taskId = req.params.taskId;

        console.log('taskId: ', taskId);
        const { 
            eventId, 
            participantId, 
            transactionType,
            approvalStatus,
            credits 
        } = req.body;

        // Check if the event exist
        const event = await Event.findByPk(eventId);

        if (!event) {
            return res.status(404).json({
                error: 'Event does not exist'
            })
        };

        const isHost = event.hostId === userId;

        // Check if the task exist
        const task = await Task.findByPk(taskId);

        console.log('----found task----');
        if (!task) {
            return res.status(404).json({
                error: 'This task does not exist.'
            })
        };

        console.log('------finding participant-----');
        // Find participant that submitted the task
        const participant = await UserEvent.findOne({
            where: {
                eventId: eventId,
                userId: participantId
            }
        });

        console.log('-----participant: ', participant);

        if (!participant) {
            return res.status(404).json({
                error: 'This user is not in the event.'
            })
        };

        console.log('------Check if the host has permission: ', isHost);
        // Check if the user has permission to approve
        if (!isHost) {
            return res.status(403).json({
                error: 'You are not authorized to approve this task'
            })
        };

        console.log('isHost: ', isHost);
        // Approve and add or substract points from pariticpant
        if (approvalStatus === 'Approved') {
            console.log('---Approving the task---');
            task.status = 'Approved';

            if (transactionType === 'Add') {
                participant.totalCredits += credits;
            };
    
            if (transactionType === 'Substract') {
                participant.totalCredits -= credits;
            };

            await task.save();
            await participant.save();

            return res.status(200).json({
                message: 'Successfully Approved.'
            });
        } 
        
        if (approvalStatus === 'Rejected') {
            task.status = 'Rejected';

            await task.save();

            return res.status(200).json({
                message: 'Successfully Rejected.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: 'Internal System Error!'
        })
    }
})


module.exports = router;