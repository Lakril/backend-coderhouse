import User from '../daos/mongooseDB/models/User.js';
import config from '../config/index.js';

// jwt
export async function appendJwtCookie(req, res, next) {
    try {
        // console.log('req.user: ', req.user);
        const accessToken = await User.generateAuthToken(req.user);
        console.log('generated token: ', accessToken);
        res.cookie('authorization', accessToken, config.jwt.cookie);
        next();
    } catch (error) {
        console.log('error: ', error);
        next(error);
    }
}

export async function removeJwtCookie(req, res, next) {
    res.clearCookie('authorization', config.jwt.cookie);
    next();
}
