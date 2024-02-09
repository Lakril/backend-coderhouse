import User from '../dao/mongooseDB/models/User.js';
import process from 'process';

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
        res.render('profile.hbs', { title: 'Profile', ...req.session['user'] });
    },
    login: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            req.session['user'] = {
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
            };
            // if (await !user.comparePassword(req.body.password, user.password)) {
            //     return res.status(403).json({ message: 'Invalid password' });
            // }
            if (user.email === process.env.ADMIN_EMAIL) {
                req.session['user'].role = 'admin';
            } else {
                req.session['user'].role = 'user';
            }
            res.status(201).json({ status: 'success', payload: req.session['user'] });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    delete: (req, res) => {
        req.session.destroy(() => {
            res.status(204).end();
        });
    },
    register: async (req, res) => {
        console.log(req.body);
        try {
            const user = await User.create({
                ...req.body,
            });
            await user.save();
            res.status(201).json({ status: 'success', payload: user.toObject() });
        } catch (error) {
            res.status(400).json({ status: 'fail', message: error.message });
        }
    },
};
