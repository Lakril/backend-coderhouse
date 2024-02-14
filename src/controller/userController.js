import User from '../dao/mongooseDB/models/User.js';
import process from 'process';
import bcrypt from 'bcrypt';

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
    getResetPassword: (req, res) => {
        res.render('resetpassword.hbs', { title: 'Reset Password' });
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            let dataUser;

            if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
                dataUser = {
                    name: 'admin',
                    lastname: 'admin',
                    email: 'admin',
                    role: 'admin',
                };
            } else {
                const user = await User.findOne({ email }).lean();

                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                const match = await bcrypt.compare(password, user.password);

                if (!match) {
                    return res.status(403).json({ message: 'Invalid password' });
                }
                dataUser = {
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email,
                    role: 'user',
                };
            }

            req['session'].user = dataUser;
            res.status(201).json({ status: 'success', payload: req['session'].user });
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
            console.log(user);
            await user.save();
            res.status(201).json({ status: 'success', payload: user.toObject() });
        } catch (error) {
            res.status(400).json({ status: 'fail', message: error.message });
        }
    },
    resetPassword: async (req, res) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const updated = await User.updateOne(
                { email: req.body.email },
                { $set: { password: req.body.password } },
                { new: true }
            );
            if (!updated) {
                return res.status(404).json({ status: 'fail', message: 'User not found' });
            }
            res.status(200).json({ status: 'success', payload: updated });
        } catch (error) {
            res.status(400).json({ status: 'fail', message: error.message });
        }
    },
};
