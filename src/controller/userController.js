// @ts-nocheck
import User from '../dao/mongooseDB/models/User.js';
import passport from 'passport';

const COOKIE_OPTS = {
    signed: true,
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
};

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
    // POST - session API
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.login(email, password);
            console.log(user);
            res.cookie('authorization', user.token, COOKIE_OPTS);
            res.status(201).json({
                status: 'success',
                message: 'login success',
                payload: user,
            });
        } catch (error) {
            res.status(401).json({ status: 'fail', message: error.message });
        }
        // passport.authenticate('localLocal', (err, user) => {
        //     if (err) {
        //         res.status(401).json({ status: 'error', message: err.message });
        //     }
        //     if (err) {
        //         // If an error occurs, pass it to the next middleware
        //         return next(err);
        //     }
        //     if (!user) {
        //         /* If authentication failed, `user` will be set to false.
        //         You can send a response accordingly. */
        //         return res.status(401).json({ status: 'error', message: 'login failed' });
        //     }
        //     req.logIn(user, (err) => {
        //         if (err) {
        //             return next(err);
        //         }
        //         // const token = User.generateAuthToken(user);
        //         /* If authentication succeeded, `user` will be the authenticated user.
        //         You can send a response accordingly. */
        //         // console.log(user.token);
        //         return res.status(201).json({
        //             status: 'success',
        //             message: 'login success',
        //             payload: user,
        //             token: user.token,
        //         });
        //     });
        // })(req, res, next);
    },
    // post users API
    register: async (req, res) => {
        const userData = req.body;
        console.log(userData);

        try {
            const user = await User.create(userData);
            await user.save();

            const accessToken = await User.generateAuthToken(user.toObject());
            // console.log(` test print accessToken ${accessToken}`);
            res.cookie('authorization', accessToken, COOKIE_OPTS);
            res.status(201).json({ status: 'success', payload: user });
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
    // current user
    userSession: async (req, res) => {
        const user = await User.verifyToken(req['accessToken']);
        // console.log(user);
        try {
            // it's no necessary to send status 200
            res.json({ status: 'success', payload: user });
        } catch (error) {
            res.status(403).json({ status: 'fail', message: error.message });
        }
    },
    // user: async (req, res) => {
    //     res.json(req.user);
    // },
    logout: (req, res) => {
        res.clearCookie('authorization', COOKIE_OPTS);
        res.status(204).json({ status: 'success', message: 'logout success' });
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
            console.log(updated);
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
