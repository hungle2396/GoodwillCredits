const express = require('express');
const router = express.Router();
const Event = require('../models/index')['Event'];

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
        console.log('create event req: ', req);
        const { userId, name, description, startDate, endDate  } = req.body;

        const event = await Event.create({
            host_id: userId,
            name: name,
            description: description,
            start_date: startDate,
            end_date: endDate
        });

        console.log('new event info: ', event);
        res.json(event);
    } catch (error) {
        console.error('Error creating event: ', error);
        res.status(500).json({ error: 'An error occurred while creating the event' });
    }
});

module.exports = router;