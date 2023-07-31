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


/**** Delete a user ****/ 
router.delete('/:id', async (req, res) => {
    console.log('In the user delete');
    const accountId = req.params.id;
    const { userId, role } = req.body;
    
    console.log('accountId: ', accountId);
    console.log('userId: ', userId);
    console.log('role: ', role);
    try {
        const user = await User.findOne({
            where: {
                id: accountId
            }
        });
    
        console.log('user: ', user);
        if (!user) {
            return res.json({
                error: 'User does not exist'
            });
        }
    
        if (user.role !== 'Admin' && user.id !== accountId) {
            return res.json({
                error: 'You are not authorized to delete this account'
            })
        };
    
        console.log('Authorizing to delete user');

        await user.destroy();

        if (role === 'Admin') {
            return res.json({
                message: 'Successfully deleted the account'
            });
        }

        req.session.destroy((error) => {
            console.log("Destroyed cookie");
            if (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }

            res.clearCookie("connect.sid");
            console.log("cleared the cookie");
            res.json({
                message: 'Deleted the user successfully'
            })
        });

        
    } catch (error) {
        console.log('Error: ', error);

        return res.json({
            error: error
        });
    }
})

module.exports = router;