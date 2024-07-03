import User from '../dao/mongooseDB/models/User.js';

const COOKIE_OPTS = {
    signed: true,
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
};

// jwt
export async function appendJwtCookie(req, res, next) {
    if (!req.user) {
        console.log('no user');
        return next && next(new Error('No user found'));
    }
    try {
        console.log('req.user: ', req.user);
        const accessToken = await User.generateAuthToken(req.user);
        console.log('generated token: ', accessToken);
        res.cookie('authorization', accessToken, COOKIE_OPTS);
        if (typeof next === 'function') {
            next();
        }
    } catch (error) {
        if (typeof next === 'function') {
            next(error);
        } else {
            console.error('Error appending JWT cookie:', error);
            // Optionally, handle the error differently if `next` is not available
        }
    }
}

export async function removeJwtCookie(req, res, next) {
    res.clearCookie('authorization', COOKIE_OPTS);
    next();
}
