const { User } = require("../models/index");
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
            const user = await User.findByPk(id);

            if (!user) {
                return done(null, false);
            }
            done(null, user);
        } catch (err) {
            done(err, null)
        }
    });


    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email', // field in the request body
                passwordField: 'password', // field in the request body
                passReqToCallback: true, // allows us to pass back the entire request to the callback
                session: true,
            },
            async (req, email, password, done) => {
                const user = await User.findOne({
                    where: { email: email }
                });

                if (!user) {
                    return done(null, false, { error: 'Incorrect email, please try again.' });
                }

                bcrypt.compare(password, user.password, (err, res) => {
                    if (res) {
                        return done(null, user);
                    } else {
                        return done(null, false, { error: "Incorrect password, please try again."});
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
            console.log('accessToken: ', accessToken);
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

                    existingUser.isOnline = true;
                    await existingUser.save();
                    return done(null, existingUser);
                }
    
                console.log(`user doesn't exist in the database, creating a new one`);
                // User does not exist, create new user
                const newUser = await User.create({
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    birthday: '',
                    phone: '',
                    address: '',
                    city: '',
                    state: '',
                    registrationType: 'google',
                    googleId: profile.id,
                    role: 'User',
                    isOnline: true
                });
                
                return done(null, newUser);
            } catch (error) {
                console.log('error', error);
                return done(error);
            }
        })
    );
}