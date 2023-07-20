const express = require("express");
const session = require("express-session");
const cors = require('cors');
const dotenv = require("dotenv");
const dotenvConfig = require("dotenv").config();
const passport = require("passport");
const keys = require("./config/keys");
const passportConfig = require('./services/passport')(passport);

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./models");

// Create the Express app
const app = express();

// Enable CORS
app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// Middleware for parsing URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Create the session store
const sessionStore = new SequelizeStore({
    db: db.sequelize,
});

// Set up session middleware
app.use(session({
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
    },
    rolling: true // Refresh the session on each request
}));

// initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./routes/authenticated");
const googleRoutes = require('./routes/google_login');
const localLoginRoutes = require('./routes/traditional_login');
const eventRoutes = require('./routes/eventRoutes');

app.use('/auth/google', googleRoutes);
app.use('/api', localLoginRoutes);
app.use('/api/events', eventRoutes);


// connect to the database
const connectToDatabase = async () => {
    sessionStore.sync();

    try {
        await db.sequelize.authenticate();
        console.log('Connect to database successfully!');
    } catch (error) {
        console.log('Unable to connect to the database', error);
    }
};

// Start the Server
const startServer = () => {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    });
};

connectToDatabase();
startServer();

// Heroku - Live setup
if (process.env.NODE_ENV === "production") {
    // Express will serve up production assets
    // like our main.js file, or main.css file
    app.use(express.static('client/build'));

    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}