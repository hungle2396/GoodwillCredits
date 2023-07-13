const express = require('express');
const router = express.Router();
const Event = require('../models/index')['Event'];
const UserEvent = require('../models/index')['UserEvent'];

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll();
        res.json(events);
    } catch (error) {
        console.error('Error retrieving events: ', error);
        res.status(500).json({ error: 'An error occured while retrieving events data' });
    }
})


// Create a new event
router.post('/', async (req, res) => {
    try {
        const { userId, name, description, startDate, endDate  } = req.body;

        const event = await Event.create({
            host_id: userId,
            name: name,
            description: description,
            start_date: startDate,
            end_date: endDate
        });

        // Add the host user to the Userevent table
        await UserEvent.create({
            user_id: userId,
            event_id: event.id,
            host_id: userId
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