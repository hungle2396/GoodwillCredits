const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const dotenvConfig = require("dotenv").config();
const passport = require("passport");
const keys = require("./config/keys");
const passportConfig = require('./services/passport')(passport);
const db = require("./models");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const authRoutes = require("./routes/google_login");

const PORT = process.env.PORT || 5000;

// Create the Express app
const app = express();

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
    store: sessionStore
}));

// initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

db.sequelize.sync().then(() => {
    // Sync the session store with the database
    sessionStore.sync();

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
});

authRoutes(app);