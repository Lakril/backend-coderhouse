import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../dao/mongooseDB/models/User.js';

passport.use(
    'local',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const user = await User.login(email, password);
                if (!user) {
                    return done(null, false, { message: 'Incorrect credentials.' });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    // User.findById(user._id, (err, user) => {
    done(null, user);
    // });
});

export const passportInitialize = passport.initialize();
export const passportSession = passport.session();
