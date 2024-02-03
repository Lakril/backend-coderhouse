import { randomBytes } from 'crypto';
import cookieParser from 'cookie-parser';

const sessions = {};

function sessionCookies (req, res, next) {
    const idSession = req.signedCookies.sessionId && sessions[req.signedCookies.sessionId]
        ? req.signedCookies.sessionId
        : randomBytes(16).toString('hex');

    if (!req.signedCookies.sessionId || !sessions[req.signedCookies.sessionId]) {
        sessions[idSession] = {};
        res.cookie('sessionId', idSession, { signed: true });
    }

    req['session'] = sessions[idSession];
    req['deleteSession'] = () => {
        delete sessions[idSession];
        res.clearCookie('sessionId');
    }
    next();
}

export default function ({secret}) {
    return (req, res, next) => {
        cookieParser(secret)(req, res, () => {
            sessionCookies(req, res, next);
        });
    }
}