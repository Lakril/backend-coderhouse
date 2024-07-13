import passport from 'passport';
import { appendJwtCookie } from '../middlewares/authentication.js';

export const controller = {
    getRegister: (req, res) => {
        res.render('register.hbs', { title: 'Register' });
    },
    getLogin: (req, res) => {
        res.render('login.hbs', { title: 'Login' });
    },
    getProfile: (req, res) => {
        res.render('profile.hbs', { title: 'Profile', user: req.user });
    },
    getResetPassword: (req, res) => {
        res.render('resetpassword.hbs', { title: 'Reset Password' });
    },
    getEdit: (req, res) => {
        res.render('editprofile.hbs', { title: 'Edit Profile' });
    },
    githubLogin: async (req, res, next) => {
        passport.authenticate('github-login', {
            escope: ['user:email'],
            session: false,
        })(req, res, next);
    },
    githubCallback: (req, res) => {
        passport.authenticate('github-login', { failureRedirect: '/login' }, (err, user) => {
            if (err) {
                return res.redirect('/login');
            }
            if (!user) {
                return res.redirect('/login');
            }
            req.login(user, { session: false }, (loginErr) => {
                if (loginErr) {
                    return res.redirect('/login');
                }
                appendJwtCookie(req, res, () => {
                    return res.redirect('/profile');
                });
            });
        })(req, res);
    },
};
