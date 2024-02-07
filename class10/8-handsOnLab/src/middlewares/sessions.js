import session from 'express-session'
import connectMongo from 'connect-mongo'
import { MONGODB_CNX_STR, SESSION_SECRET } from '../config.js'

const store = connectMongo.create({
    mongoUrl: MONGODB_CNX_STR,
    ttl: 60 * 60 * 24, // 1 day
})

export const sessions = session({
    store,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { sameSite: 'strict' },
})
