const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { promisify } = require('util');
const keys = require("../config/keys");


module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        console.log(user);
        done(null, user.id);
    });

    passport.deserializeUser( async (id, done) => {
        try {
            const user = await User.findByPk(id);
            done(null, user.get());
        } catch (err) {
            done(err, null)
        }
    });


    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true, // allows us to pass back the entire request to the callback
                session: true,
            },
            async (req, email, password, done) => {
                console.log("trying to log in as ", email);

                const user = await User.findOne({
                    where: { email: email }
                });

                console.log("user is: ", user);
                if (!user) {
                    return done(null, false, { message: 'Incorrect email.' });
                }

                bcrypt.compare(password, user.password, (err, res) => {
                    if (res) {
                        console.log("Successfully login!");
                        const userinfo = user.get();
                        return done(null, userinfo);
                    } else {
                        console.log("Incorrect password");
                        return done(null, false, { message: "Incorrect password."});
                    }
                })
            }
        )
    );

    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
    
            console.log('profile: ', profile);
            try {
                console.log('Finding existing user! ');
                // Check if the user already exists in the database
                const existingUser = await User.findOne({
                    where: { googleId: profile.id, email: profile.emails[0].value }
                });
    
                console.log('existingUser: ', existingUser);
                if (existingUser) {
                    // User already exists, proceed with authentication
                    console.log(`user already exist in the database`);
                    return done(null, existingUser);
                }
    
                console.log(`user doesn't exist in the database, creating a new one`);
                // User does not exist, create new user
                const newUser = await User.create({
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    registrationType: 'google',
                    googleId: profile.id
                });
                
                return done(null, newUser);
            } catch (error) {
                console.log('error', error);
                return done(error);
            }
        })
    );
}