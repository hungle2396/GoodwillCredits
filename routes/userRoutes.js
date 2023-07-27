const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Get All the users
router.get('/', async (req, res) => {
    
    try {
        const users = await User.findAll();

        if (!users) {
            return res.json({
                error: 'Users do not exist'
            });
        }

        return res.json(users);
    } catch (error) {
        console.log('Error fetching users', error);

        return res.json({
            error: error
        });
    }
});

module.exports = router;