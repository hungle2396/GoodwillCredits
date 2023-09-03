const express = require('express');
const router = express.Router();
const { User, Event, UserEvent } = require('../models/index');

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll();

        return res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'An error occured while retrieving events data' });
    }
})


// Get all events related to specific user
router.get('/users/:userId', async (req, res) => {
    // Get the user id
    const userId = req.params.userId;

    try {
        // Check if the user exist
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                error: 'User does not exist'
            });
        }

        // Find the events related to this user
        const events = await Event.findAll({
            include: [
                {
                    model: User,
                    as: 'users',
                    where: { id: user.id },
                    attributes: ['id', 'firstName', 'lastName'],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: User,
                    as: 'host',
                    // Include the host first and last name
                    attributes: ['firstName', 'lastName']
                }
            ]
        });

        return res.json(events);
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
});


// Create a new event
router.post('/', async (req, res) => {
    try {
        const { userId, name, description, tag, active, startDate, endDate  } = req.body;

        const event = await Event.create({
            name: name,
            description: description,
            tag: tag,
            active: active,
            hostId: userId,
            startDate: startDate,
            endDate: endDate
        });

        // Add the host user to the Userevent table
        await UserEvent.create({
            userId: userId,
            eventId: event.id,
            isHost: true
        });

        res.status(200).json({
            message: `Successfully created new event.`
        });
    } catch (error) {
        console.error('Error creating event: ', error);
        res.status(500).json({ error: 'Error creating new event.' });
    }
});

// Edit an event
router.put('/:id', async (req, res) => {
    const eventId = req.params.id;
    const { 
        userId, 
        name, 
        description,
        tag,
        active, 
        startDate, 
        endDate 
    } = req.body;

    try {
        // Check if the event exist
        const event = await Event.findByPk(eventId);

        if (!event) {
            return res.status(404).json({
                message: 'Event Does Not Exist.'
            });
        }

        // Check if the event associated with the user
        const userEvent = await UserEvent.findOne({
            where: {
                eventId: eventId,
                userId: userId
            }
        });

        if (!userEvent) {
            return res.status(404).json({
                error: 'Event does not have any association with this user.'
            });
        };

        // Check if the user has permission to edit
        if (!userEvent.isHost) {
            return res.status(403).json({
                error: 'You do not have permission to edit this event.'
            })
        };

        // Update Event
        event.name = name;
        event.description = description;
        event.tag = tag;
        event.active = active;
        event.startDate = startDate;
        event.endDate = endDate;

        await event.save();

        return res.status(200).json({
            message: 'Successfully Edited.'
        });

    } catch (error) {
        console.error('Error Editing Event: ', error);

        return res.status(500).json({
            error: 'Error Editing the Event.'
        });
    }
})

// Delete an event
router.delete('/:id', async (req, res) => {
    const eventId = req.params.id;
    const { userId } = req.body;

    try {
        // Find the event
        const event = await Event.findByPk(eventId);

        if (!event) {
            return res.status(404).json({
                error: 'Event does not exist'
            });
        }

        // Check if the event associated with the user
        const userEvent = await UserEvent.findOne({
            where: {
                eventId: eventId,
                userId: userId
            }
        });

        if (!userEvent) {
            return res.status(404).json({
                error: 'Event does not have any association with this user'
            });
        };

        // Check if the user has permission to edit
        if (!userEvent.isHost) {
            return res.status(403).json({
                error: 'You do not have permission to delete this event.'
            })
        };

        const eventName = event.name;
        // Delete the event
        await event.destroy();

        // Send the response to the client
        return res.status(200).json({
            message: `Successfully deleted ${eventName}.`
        });
    } catch (error) {
        console.error('Error deleting event: ', error);
        return res.status(500).json({
            error: 'An error occurred while deleting the event'
        });
    }
});

module.exports = router;