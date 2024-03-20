// @ts-nocheck
import User from '../dao/mongooseDB/models/User.js';
import passport from 'passport';

export const controller = {
    getUsers: async (req, res) => {
        try {
            const users = await User.list();
            res.status(200).json({ status: 'success', payload: users });
        } catch (error) {
            res.status(500).json({ status: 'fail', message: error.message });
        }
    },
    getRegister: (req, res) => {
        res.render('register.hbs', { title: 'Register' });
    },
    getLogin: (req, res) => {
        res.render('login.hbs', { title: 'Login' });
    },
    profile: (req, res) => {
        res.render('profile.hbs', { title: 'Profile' });
    },
    getResetPassword: (req, res) => {
        res.render('resetpassword.hbs', { title: 'Reset Password' });
    },
    login: async (req, res, next) => {
        passport.authenticate('local', (err, user) => {
            if (err) {
                res.status(401).json({ status: 'error', message: err.message });
            }
            if (err) {
                // If an error occurs, pass it to the next middleware
                return next(err);
            }
            if (!user) {
                /* If authentication failed, `user` will be set to false.
                You can send a response accordingly. */
                return res.status(401).json({ status: 'error', message: 'login failed' });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                // const token = User.generateAuthToken(user);
                /* If authentication succeeded, `user` will be the authenticated user.
                You can send a response accordingly. */
                // console.log(user.token);
                return res.status(201).json({
                    status: 'success',
                    message: 'login success',
                    payload: user,
                    token: user.token,
                });
            });
        })(req, res, next);
    },
    // post
    register: async (req, res) => {
        const userData = req.body;

        try {
            const user = await User.create(userData);

            const token = await User.generateAuthToken(user.toObject());
            req.login(user.toObject(), async (err) => {
                if (err) {
                    return res.status(400).json({ status: 'fail', message: err.message });
                } else {
                    user.save();
                    res.status(201).header('auth-token', token).json({
                        status: 'success',
                        payload: user.toObject(),
                        token: token,
                    });
                }
            });

            console.log(user);
        } catch (error) {
            res.status(400).json({ status: 'fail', message: error.message });
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { email, password } = req.body;
            const updated = await User.resetPassword(email, password);
            res.status(200).json({ status: 'success', payload: updated });
        } catch (error) {
            res.status(401).json({ status: 'fail', message: error.message });
        }
    },
    userSession: async (req, res) => {
        const user = await User.verifyToken(req['accessToken']);
        try {
            res.status(200).json({ status: 'success', payload: user });
        } catch (error) {
            res.status(401).json({ status: 'fail', message: error.message });
        }
    },
    // user: async (req, res) => {
    //     res.json(req.user);
    // },
    delete: (req, res) => {
        req.session.destroy(() => {
            res.status(204).end();
        });
    },
    githubLogin: async (req, res, next) => {
        passport.authenticate('loginGithub')(req, res, next);
    },
    githubCallback: async (req, res, next) => {
        passport.authenticate('loginGithub', (err, user) => {
            if (err) {
                return res.status(401).json({ status: 'error', message: err.message });
            }
            if (!user) {
                return res.status(401).json({ status: 'error', message: 'login failed' });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/profile');
            });
        })(req, res, next);
    },
    updateUser: async (req, res) => {
        try {
            const { username, name, lastname, email } = req.body;
            const updated = await User.updateUser(username, {
                name,
                lastname,
                email,
            });
            await updated.save();
            res.status(200).json({ status: 'success', payload: updated });
        } catch (error) {
            res.status(401).json({ status: 'fail', message: error.message });
        }
    },
    editProfile: (req, res) => {
        res.render('editprofile.hbs', { title: 'Edit Profile', ...req.user });
    },
    // auth: async (req, res) => {
    //     res.json(req.user);
    // },
};
