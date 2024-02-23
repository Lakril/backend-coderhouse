import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../dao/mongooseDB/models/User.js';
import process from 'process';
// import { encryptData } from '../utils/criptografia.js';

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

passport.use(
    'loginGithub',
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ username: profile.username });
                if (!user) {
                    user = await User.create({
                        name: profile.displayName,
                        username: profile.username,
                    });
                }
                return done(null, user.toObject());
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
