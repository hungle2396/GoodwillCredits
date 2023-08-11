const express = require('express');
const router = express.Router();
const { User, Event, UserEvent } = require('../models/index');

// Get the participants related to a specific event
router.get('/event/:eventId', async (req, res) => {
    const eventId = req.params.eventId;

    console.log('In the event participants route');
    console.log('eventId: ', eventId);

    try {
        // Check if the event exist
        const event = await Event.findByPk(eventId);

        if (!event) {
            return res.status(404).json({
                error: 'Event does not exist'
            });
        }

        console.log('Finding all the particpants related to this event');
        const participants = await UserEvent.findAll({
            // Need help finding all the participants in related event
            where: {
                eventId: event.id
            },
            attributes: ['id', 'isHost', 'totalCredits'],
            include: [
                {
                    model: User,
                    as: 'user', // Define alias for User model
                    attributes: ['firstName', 'lastName', 'isOnline', 'updatedAt']
                }
            ]
        })

        console.log('participants: ', participants);
        return res.json(participants);
    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).json({
            error: error
        });
    }
});

// router.post('/', async (req, res) => {

// })

module.exports = router;