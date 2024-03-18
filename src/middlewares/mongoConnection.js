// config/database.js
import mongoose from 'mongoose';
import process from 'process';

export const dbConnection = (uri = process.env.MONGODB_URI) => {
    try {
        mongoose.connect(uri, {
            // serverSelectionTimeoutMS: 5000,
        });

        const db = mongoose.connection;

        // CONNECTION EVENTS
        db.on('connected', () => {
            console.log(`You are connected to Mongo ${db.name} at ${db.host}:${db.port}`);
        });
        // Event handling for connection error
        db.on('error', (err) => {
            console.log(`Database connection error: ${err}`);
        });
        // Event handling for connection disconnect
        db.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        // Event when the connection is reconnected
        db.on('reconnected', () => {
            console.log('Mongoose default connection is reconnected');
        });

        // Close the connection when done
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    } catch (error) {
        // sudo systemctl start mongod
        console.error('Error connecting to MongoDB:', error.message);

        // Handle specific error conditions
        if (error.name === 'MongoNetworkError') {
            console.error('Network error occurred. Check your MongoDB server.');
        } else if (error.name === 'MongooseServerSelectionError') {
            console.error('Server selection error. Ensure MongoDB is running and accessible.');
        } else {
            // Handle other types of errors
            console.error('An unexpected error occurred:', error);
        }
    }
};
