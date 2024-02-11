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
            await user.save();
            res.status(201).json({ status: 'success', payload: user.toObject() });
        } catch (error) {
            res.status(400).json({ status: 'fail', message: error.message });
        }
    },
};
