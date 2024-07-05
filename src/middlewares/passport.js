import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../dao/mongooseDB/models/User.js';
import config from '../config/index.js';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

// jwt extract token from signedCookies
// passport.use(
//     'jwt',
//     new JwtStrategy(
//         {
//             jwtFromRequest: ExtractJwt.fromExtractors([
//                 function (req) {
//                     let token = null;
//                     if (req && req.signedCookies) {
//                         token = req.signedCookies.authorization;
//                     }
//                     return token;
//                 },
//             ]),
//             secretOrKey: config.jwt.secret,
//         },
//         async (jwtPayload, done) => {
//             try {
//                 const user = await User.findById(jwtPayload.sub);
//                 if (!user) {
//                     return done(null, false);
//                 }
//                 return done(null, user);
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );

passport.use(
    'jwt',
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([
                function (req) {
                    let token = null;
                    if (req?.signedCookies) {
                        token = req.signedCookies.authorization;
                    }
                    return token;
                },
            ]),
            secretOrKey: config.jwt.secret,
        },
        function loginUser(user, done) {
            // console.log(user)
            done(null, user);
        }
    )
);

//* github strategy ----------------------------------------------
passport.use(
    'github-login',
    new GitHubStrategy(
        {
            clientID: config.github.clientId,
            clientSecret: config.github.clientSecret,
            callbackURL: config.github.callbackURL,
        },
        async function verify(accessToken, refreshToken, profile, done) {
            const user = await User.findOne({ username: profile.username });
            if (user) {
                return done(null, {
                    ...user.publicInfo(),
                    rol: 'user',
                });
            }
            try {
                // Assuming profile.displayName is a string like 'Jackson Rico'
                let name, lastname;
                if (typeof profile.displayName === 'string') {
                    const splitName = profile.displayName.split(' ');
                    name = splitName[0];
                    lastname =
                        splitName.length > 1 ? splitName.slice(1).join(' ') : '(sin especificar)';
                } else {
                    // Fallback if profile.displayName is not in the expected format
                    name = profile.displayName[0]?.value || '(sin especificar)';
                    lastname = profile.displayName[1]?.value || '(sin especificar)';
                }
                const newUser = await User.register({
                    name: name,
                    lastname: lastname,
                    username: profile.username,
                    email: profile.username,
                    password: '(sin especificar)',
                });
                // done save user in req.user
                done(null, newUser);
            } catch (error) {
                done(error);
            }
        }
    )
);

//* local strategy ----------------------------------------------
passport.use(
    'local-register',
    new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email',
        },
        async (req, email, password, done) => {
            try {
                const user = await User.register(req.body);
                console.log('datauser passport', user);
                done(null, user);
            } catch (error) {
                done(null, false, error.message);
            }
        }
    )
);

passport.use(
    'local-login',
    new LocalStrategy(
        {
            usernameField: 'email',
        },
        async (email, password, done) => {
            try {
                // search user in db
                const dataUser = await User.login(email, password);
                // done save user in req.user
                done(null, dataUser);
            } catch (error) {
                done(null, false, error.message);
            }
        }
    )
);

export const passportInitialize = passport.initialize();
