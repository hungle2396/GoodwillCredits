const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = require('../models/index');
// const User = require('../models/index')['User'];

// User Register
router.post('/register', async (req, res) => {
    console.log("In the API Register");
    
    const { firstName, lastName, email, password } = req.body;
  
    // Check if the user already exists in the database
    const existingUser = await User.findOne({
        where: { email: email }
    });

    if (existingUser) {
        // User already exists, proceed with authentication
        return res.status(409).json({ error: "Email already exists" })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            birthday: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            isAdmin: false,
            registrationType: 'email',
            role: 'User',
            isOnline: true
        });

        req.login(newUser, (error) => {
            if (error) {
                console.error("Error storing user in session:", error);
                return res.status(500).json({ error: "Error registering user. "});
            }

            res.status(201).json({ 
                message: 'User registered successfully.',
                redirectUrl: '/dashboard',
                user: newUser,
                session: req.session
            });
        });
    } catch (err) {
      return res.status(500).json({ error: 'Error registering user.' });
    }
});

// User Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        console.log("User: ", user);
        if (!user) {
            return res.status(401).json({
                message: "Incorrect username or password"
            })
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            res.json({ 
                message: 'Login successful', 
                user: req.user,
                redirectUrl: '/dashboard'
            });
        });
    })(req, res, next);
});


// User Log out
router.get('/logout', async (req, res, next) => {
    const userId = req.user.id;
    
    try {
        const user = await User.findByPk(userId);

        if (user) {
            // Update the isOnline attribute to false
            user.isOnline = false;
            await user.save();
        }

        // req.logout(); // Log the user out

        req.session.destroy((error) => {
            console.log("Destroyed cookie");
            if (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }
            res.clearCookie("connect.sid");
            console.log("cleared the cookie");
            return res.redirect('/');
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }

    
});

// Check if the user is currently login or not
router.get('/current_user', (req, res) => {
    res.send(req.user);
});

module.exports = router;