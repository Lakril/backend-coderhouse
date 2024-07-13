import passport from 'passport';
import { appendJwtCookie, removeJwtCookie } from '../middlewares/authentication.js';
// import config from '../config/index.js';

export const controller = {
    login: (req, res) => {
        passport.authenticate(
            'local-login',
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
                        return await res['creado'](req.user);
                    });
                });
            }
        )(req, res);
    },
    //* GET - session API /current
    userSession: async (req, res) => {
        passport.authenticate('jwt', { session: false })(req, res, (err) => {
            if (err) {
                res.status(401).json({ status: 'error', message: err.message });
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'user session',
                    payload: req.user,
                });
            }
        });
    },
    //* DELETE - session API
    logout: async (req, res) => {
        removeJwtCookie(req, res, () => {
            return res.status(200).json({ status: 'success', message: 'logout' });
        });
    },
};
