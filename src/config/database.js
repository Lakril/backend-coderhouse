// config/database.js
import mongoose from 'mongoose';

export const dbConnection = (uri) => {
    //MONGOOSE CONNECTION
    const db = mongoose.connection;

    mongoose.connect(uri, {});
    //CONNECTION EVENTS
    db.on('connected', () => {
        console.log(`You are connected to Mongo`);
    })
        .on('error', (error) => {
            console.error(error.message);
        })
        .on('disconnected', () => {
            console.log('Mongoose Disconnected');
        });
};
