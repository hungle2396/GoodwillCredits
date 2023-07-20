const express = require('express');
const router = express.Router();
const Event = require('../models/index')['Event'];
const UserEvent = require('../models/index')['UserEvent'];
const { User } = require('../models/index');

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll();

        return res.json(events);
    } catch (error) {
        console.error('Error retrieving events: ', error);
        res.status(500).json({ error: 'An error occured while retrieving events data' });
    }
})


// Get all events related to specific user
router.get('/users/:userId', async (req, res) => {
    // Get the user id
    const userId = req.params.userId;

    console.log('In the events route');
    console.log('userId', userId);
    try {
        // Check if the user exist
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                error: 'User does not exist'
            });
        }

        console.log('Finding specific events');
        // Find the events related to this user
        const events = await Event.findAll({
            include: [
                {
                    model: User,
                    as: 'users',
                    where: { id: user.id }
                }
            ]
        });

        console.log('events ', events);
        return res.json(events);
    } catch (error) {
        console.error('Error: ', error);

        return res.status(500).json({
            error: error
        });
    }
});


// Create a new event
router.post('/', async (req, res) => {
    try {
        const { userId, name, description, startDate, endDate  } = req.body;

        const event = await Event.create({
            name: name,
            description: description,
            startDate: startDate,
            endDate: endDate
        });

        // Add the host user to the Userevent table
        await UserEvent.create({
            userId: userId,
            eventId: event.id,
            hostId: userId
        });

        res.json(event);
    } catch (error) {
        console.error('Error creating event: ', error);
        res.status(500).json({ error: 'An error occurred while creating the event' });
    }
});

// Delete an event
router.delete('/:id', async (req, res) => {
    try {
        console.log('req: ', req);
        // Get the event id
        const eventId = req.params.id;
        
        // Check if the event exists in the database
        const event = await Event.findByPk(eventId);

        if (!event) {
            return res.status(404).json({
                error: 'Event not found'
            });
        }

        // Delete the event
        await event.destroy();

        // Return the result
        res.json({
            message: 'Event deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting event: ', error);
        res.status(500).json({
            error: 'An error occurred while deleting the event'
        })
    }
});

module.exports = router;