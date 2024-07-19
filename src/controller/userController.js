// @ts-nocheck
import User from '../dao/mongooseDB/models/User.js';
import passport from 'passport';
import { appendJwtCookie } from '../middlewares/authentication.js';
import { permit } from '../middlewares/authorization.js';
// import { appendJwtCookie } from '../middlewares/authentication.js';

export const controller = {
    register: (req, res) => {
        passport.authenticate(
            'local-register',
            { session: false, failWithError: true },
            (err, user, info) => {
                if (err) {
                    return res['notServer'](err);
                }
                if (!user) {
                    return res['notFound'](info);
                }
                req.login(user, { session: false }, (loginErr) => {
                    if (loginErr) {
                        return res['notServer'](loginErr);
                    }
                    appendJwtCookie(req, res, async (appendErr) => {
                        if (appendErr) {
                            return res['notServer'](appendErr);
                        }
                        return await res['created'](req.user);
                    });
                });
            }
        )(req, res);
    },
    updateUser: (req, res) => {
        passport.authenticate(
            'jwt',
            { session: false, failWithError: true },
            async (err, user, info) => {
                if (err) {
                    return res['notServer'](err);
                }
                if (!user) {
                    return res['notFound'](info);
                }
                try {
                    // Assuming User.updateUser is an async function. If not, remove await.
                    // Pass user to updateUser method
                    req.user = await User.updateUser(req.body);
                } catch (error) {
                    return res['notFound'](error.message);
                }
                try {
                    appendJwtCookie(req, res, async (appendErr) => {
                        if (appendErr) {
                            return res['notServer'](appendErr);
                        }
                        return await res['ok'](req.user);
                    });
                } catch (updateErr) {
                    return res['notServer'](updateErr);
                }
            }
        )(req, res);
    },
    resetPassword: async (req, res) => {
        try {
            req.user = await User.resetPassword(req.body);
        } catch (error) {
            return res['notFound'](error.message);
        }
        try {
            appendJwtCookie(req, res, async (appendErr) => {
                if (appendErr) {
                    return res['notServer'](appendErr);
                }
                return await res['ok'](req.user);
            });
        } catch (updateErr) {
            return res['notServer'](updateErr);
        }
    },

    user: async (req, res) => {
        passport.authenticate('jwt', { session: false, failWithError: true })(req, res, () => {
            if (req.user) {
                return res['ok'](req.user);
            } else {
                return res['notAuthorized']({ message: 'User not authorized' });
            }
        });
    },
    adminUser: (req, res) => {
        passport.authenticate('jwt', { session: false, failWithError: true }, (req, res) => {
            permit(['admin'], req, res, async () => {
                const users = await User.find().lean();
                return res['ok'](users);
            });
        })(req, res);
    },
};

// user: async (req, res) => {
//     passport.authenticate('jwt', { session: false })(req, res, () => {
//         res.status(200).json({ status: 'success', payload: req.user });
//         console.log('req.user controller: ', req.user);
//     });
// },

// user: (req, res, next) => {
//     return passport.authenticate('jwt', { session: false, failWithError: true })(
//         req,
//         res,
//         next
//     );
// },
