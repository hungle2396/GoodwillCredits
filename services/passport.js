const Users = require("../models/index")["Users"];
const bcrypt = require("bcrypt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const keys = require("../config/keys");


module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        console.log(user);
        done(null, user.id);
    });

    passport.deserializeUser( async (id, done) => {
        try {
            const user = await Users.findByPk(id);
            done(null, user);
        } catch (err) {
            done(err, null)
        }
    });


    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
                session: true,
            },
            async (username, password, done) => {
                console.log(`trying to log in as ${username}`);
                const user = await Users.findOne({
                    where: { email: username }
                });

                if (!user) {
                    return done(null, false);
                }

                bcrypt.compare(password, user.password, (err, res) => {
                    if (res) {
                        console.log("successful login");
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
            }
        )
    );

    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
    
            console.log(profile);
            try {
                // Check if the user already exists in the database
                const existingUser = await Users.findOne({
                    where: { google_id: profile.id }
                });
    
                if (existingUser) {
                    // User already exists, proceed with authentication
                    console.log(`user already exist in the database`);
                    return done(null, existingUser);
                }
    
                console.log(`user doesn't exist in the database`);
                // User does not exist, create new user
                const newUser = await Users.create({
                    first_name: profile.name.givenName,
                    last_name: profile.name.familyName,
                    email: profile.emails[0].value,
                    registration_type: 'google',
                    google_id: profile.id,
                    created_at: new Date()
                });
                
                return done(null, newUser);
            } catch (error) {
                return done(error);
            }
        })
    );
}