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

// Add task (restrcited to host and user's own account)
router.post('/', async (req, res) => {
    console.log('------- In Add Task Route -----');
    try {
        const {
            userId,
            participantUserId,
            eventId,
            description, 
            transactionType,
            credits
        } = req.body;

        // const user = await User.findByPk(userId);

        // if (!user) {
        //     return res.status(404).json({
        //         error: 'User Does not exist'
        //     })
        // }

        const participant = await UserEvent.findOne({
            where: {
                userId: participantUserId,
                eventId: eventId
            }
        });

        console.log('participant: ', participant);
        // Check if the participant exist in the event
        if (!participant) {
            return res.status(404).json({
                error: 'User does not exist in this event.'
            })
        }

        // Check if the user has the permission to create task
        if (!participant.isHost && participant.userId !== participantUserId) {
            return res.status(403).json({
                error: 'You are not authorized to access this resource.'
            });
        }

        // Create new task
        await Task.create({
            userId,
            eventId,
            description,
            transactionType,
            credits
        });

        // Adding and Substracting the participant's total credits
        if (transactionType === 'Add') {
            console.log('In the add transactionType');

            console.log('participant total credits: ', participant.totalCredits);

            participant.totalCredits += credits;

            console.log('participant total credits after addition: ', participant.totalCredits);
        }

        if (transactionType === 'Substract') {
            participant.totalCredits -= credits
        }

        await participant.save();

        return res.status(200).json({
            message: `Successfully submitted credits`
        });

    } catch (error) {
        return res.status(500).json({
            error: 'Internal server error'
        })
    }
});

module.exports = router;