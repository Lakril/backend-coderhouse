import dotenv from 'dotenv';
import process from 'process';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load environment variables from .env file
const envFound = dotenv.config();
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    /**
     * Your favorite port
     */
    port: process.env.PORT || 3000,
    host: process.env.HOST,
    databaseURL: process.env.MONGODB_URI,
    sessionSecret: process.env.SESSION_SECRET,
    api: {
        prefix: '/api',
    },
    github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    admin: {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        cookie: {
            signed: true,
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        },
    },
    img: {
        avatarProfile: process.env.DEFAULT_USER_AVATAR_PATH,
    },
};
