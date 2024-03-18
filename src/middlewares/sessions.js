import session from 'express-session';
import MongoStore from 'connect-mongo';

function createSession(mongoUrl, sessionSecret) {
    const store = MongoStore.create({
        mongoUrl: mongoUrl,
        collectionName: 'sessions',
        // 1 day
        ttl: 60 * 60 * 24,
    });

    const sessions = session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        store,
        cookie: { sameSite: 'strict' },
    });

    return sessions;
}

export default createSession;
