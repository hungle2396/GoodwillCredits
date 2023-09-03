const express = require('express');
const router = express.Router();
const { User, Event, UserEvent } = require('../models/index');

// Get the participants related to a specific event
router.get('/event/:eventId', async (req, res) => {
    const eventId = req.params.eventId;

    try {
        // Check if the event exist
        const event = await Event.findByPk(eventId);

        if (!event) {
            return res.status(404).json({
                error: 'Event does not exist'
            });
        }

        const participants = await UserEvent.findAll({
            // Need help finding all the participants in related event
            where: {
                eventId: event.id
            },
            attributes: ['id', 'userId', 'eventId', 'isHost', 'totalCredits'],
            include: [
                {
                    model: User,
                    as: 'user', // Define alias for User model
                    attributes: ['id','firstName', 'lastName', 'isOnline', 'updatedAt']
                }
            ]
        })
        
        return res.json(participants);
    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).json({
            error: error
        });
    }
});

// Add Participant
router.post('/', async (req, res) => {
    const { userId, eventId, email} = req.body;

    try {
        // Check if the user exist
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(404).json({
                error: 'User does not exist in the system.'
            });
        }

        // Check if the event exist
        const event = await Event.findOne({
            where: {
                id: eventId
            }
        });

        if (!event) {
            return res.status(404).json({
                error: 'Event does not exist in the system.'
            });
        }

        // Check if the user who is adding new participant is a host
        if (event.hostId !== userId) {
            return res.status(403).json({
                error: 'You do not have permission to add new participant'
            })
        };

        // Add user to the event
        await UserEvent.create({
            userId: user.id,
            eventId: eventId,
            isHost: false,
        });

        return res.status(200).json({
            message: `Successfully added ${user.firstName}.`
        });
    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).json({
            error: error
        })
    }
})

// Delete Participant
router.delete('/:participantId', async (req, res) => {
    const participantId = req.params.participantId;

    const { userId, isHost } = req.body;
    
    try {
        // Check if the user exist
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                error: 'User does not exist in the system'
            });
        };

        // Check if the participant exist in the event
        const participant = await UserEvent.findOne({
            where: {
                id: participantId
            },
            include: [
                {
                    model: User,
                    as: 'user', // Define alias for User model
                    attributes: ['id','firstName', 'lastName', 'isOnline', 'updatedAt']
                }
            ]
        });

        if (!participant) {
            return res.status(404).json({
                error: 'This participant does not exist in this event.'
            })
        };

        // Check if the user has permission to delete participant
        // Host and the participant themselves only
        if (!isHost && participant.userId !== userId) {
            return res.status(403).json({
                error: 'You do not have permission to delete this participant.'
            })
        }

        const participantName = `${participant.user.firstName} ${participant.user.lastName}`;

        // Delete the participant from the event
        await participant.destroy();

        return res.status(200).json({
            message: `Successfully removed ${participantName}.`
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Failed to delete participant.'
        })
    }
})

module.exports = router;