const express = require('express');
const router = express.Router();
const passport = require("passport");

// module.exports = (app) => {
//     app.get('/', passport.authenticate('google', {
//             scope: ['profile', 'email']
//         })
//     );
    
//     app.get(
//         '/callback', 
//         passport.authenticate('google'),
//         (req, res) => {
//             res.redirect('/dashboard')
//         }
//     );
// }

// Authenticate google account
router.get('/', passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

// Handle callback
router.get(
    '/callback', 
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/dashboard')
    }
);

module.exports = router;