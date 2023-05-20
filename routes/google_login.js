const passport = require("passport");

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send("Hello World!")
    });


    app.get('/auth/google', passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
    
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    app.get('/api/logout', (req, res) => {
        req.logout((err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.send(req.user);
        });
    });

    // Testing
    app.get("/set-session", (req, res) => {
        req.session.exampleValue = "Hello, session!";
        res.send("Session value set.")
    });

    app.get('/get-session', (req, res) => {
        const sessionValue = req.session.exampleValue || 'No session value set.';
        res.send(`Session value: ${sessionValue}`);
    });
}