import User from '../dao/mongooseDB/models/User.js';

const COOKIE_OPTS = {
    signed: true,
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
};

// jwt
export async function appendJwtCookie(req, res, next) {
    try {
        console.log('req.user: ', req.user);
        const accessToken = await User.generateAuthToken(req.user);
        console.log('generated token: ', accessToken);
        res.cookie('authorization', accessToken, COOKIE_OPTS);
        next();
    } catch (error) {
        console.log('error: ', error);
        next(error);
    }
}

export async function removeJwtCookie(req, res, next) {
    res.clearCookie('authorization', COOKIE_OPTS);
    next();
}
