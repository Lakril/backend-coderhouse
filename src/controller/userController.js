// @ts-nocheck
import User from '../dao/mongooseDB/models/User.js';
import passport from 'passport';
import config from '../config/index.js';
import { appendJwtCookie } from '../middlewares/authentication.js';

export const controller = {
    register: async (req, res) => {
        passport.authenticate(
            'local-register',
            { session: false, failWithError: true },
            (err, user, info) => {
                if (err) {
                    return res.status(401).json({ status: 'error', message: err.message });
                }
                req.logIn(user, { session: false }, async (loginErr) => {
                    if (loginErr) {
                        return res.status(401).json({ status: 'error', message: loginErr.message });
                    }
                    await appendJwtCookie(req, res);
                    res.status(201).json({
                        status: 'success',
                        message: 'register success',
                        payload: user,
                    });
                });
            }
        )(req, res);
    },
    resetPassword: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(email + ' ' + password);
            const updated = await User.resetPassword(email, password);
            const accessToken = await User.generateAuthToken(updated);
            res.cookie('authorization', accessToken, config.jwt.cookie);
            res.status(200).json({ status: 'success', payload: updated });
        } catch (error) {
            res.status(401).json({ status: 'fail', message: error.message });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { username, name, lastname, email } = req.body;
            const updated = await User.updateUser(username, {
                name,
                lastname,
                email,
            });
            const accessToken = await User.generateAuthToken(updated);
            console.log(updated);
            res.cookie('authorization', accessToken, config.jwt.cookie);
            res.status(200).json({ status: 'success', payload: updated });
        } catch (error) {
            res.status(401).json({ status: 'fail', message: error.message });
        }
    },
    user: async (req, res) => {
        passport.authenticate('jwt', { session: false })(req, res, (err) => {
            console.log(req.user);
            if (err) {
                res.status(401).json({ status: 'error', message: err.message });
            } else {
                res.status(200).json({ status: 'success', payload: req.user });
            }
        });
    },
};
