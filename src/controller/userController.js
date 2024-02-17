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
        res.render('profile.hbs', { title: 'Profile', ...req.user });
    },
    getResetPassword: (req, res) => {
        res.render('resetpassword.hbs', { title: 'Reset Password' });
    },
    login: (req, res, next) => {
        passport.authenticate('local', (err, user) => {
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
                return res.status(201).json({
                    status: 'success',
                    message: 'login success',
                    payload: user,
                });
            });
        })(req, res, next);
    },
    delete: (req, res) => {
        req.session.destroy(() => {
            res.status(204).end();
        });
    },
    register: async (req, res) => {
        // console.log(req.body);
        try {
            const user = await User.create({
                ...req.body,
            });
            req.login(user.toObject(), async (err) => {
                if (err) {
                    return res.status(400).json({ status: 'fail', message: err.message });
                } else {
                    await user.save();
                    res.status(201).json({ status: 'success', payload: user.toObject() });
                }
            });

            // console.log(user);
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
        try {
            const { username } = req.user;
            const user = await User.findOne({ username: username });
            req.login(user.toObject(), async (err) => {
                if (err) {
                    return res.status(400).json({ status: 'fail', message: err.message });
                } else {
                    await user.save();
                    res.status(201).json({ status: 'success', payload: user.toObject() });
                }
            });
        } catch (error) {
            res.status(401).json({ status: 'fail', message: error.message });
        }
    },
    user: async (req, res) => {
        const user = await User.findOne({ email: req.user.email }, { password: 0 }).lean();
        console.log(user);
        res.json({ status: 'success', payload: user });
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
            const updated = await User.updateUser(username, { name, lastname, email });
            await updated.save();
            res.status(200).json({ status: 'success', payload: updated });
        } catch (error) {
            res.status(401).json({ status: 'fail', message: error.message });
        }
    },
    editProfile: (req, res) => {
        res.render('editprofile.hbs', { title: 'Edit Profile', ...req.user });
    },
};
