import passport from 'passport';
import config from '../config/index.js';

export const controller = {
    login: async (req, res) => {
        passport.authenticate('local-login', { failWithError: true, session: false })(
            req,
            res,
            (err) => {
                if (err) {
                    res.status(401).json({ status: 'error', message: err.message });
                } else {
                    res.status(201).json({
                        status: 'success',
                        message: 'login success',
                        payload: req.user,
                    });
                }
            }
        );
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
    logout: (req, res) => {
        res.clearCookie('authorization', config.jwt.cookie);
        res.status(204).json({ status: 'success', message: 'logout success' });
    },
};
