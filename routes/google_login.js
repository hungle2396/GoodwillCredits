const passport = require("passport");

module.exports = (app) => {
    app.get('/', (req, res) => {
        // res.send("Hello World!")
        console.log("Hello");
        res.redirect('/dashboard');
    });


    app.get('/dashboard', (req, res) => {
        console.log('In dashboard');
        res.send('Hello Dashboard');
    });

    app.get('/auth/google', passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
    
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/dashboard')
        }
    );
}