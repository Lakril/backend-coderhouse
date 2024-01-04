// config/database.js
import mongoose from 'mongoose';
import process from 'process';


export const dbConnection = async (uri) => {
    try {
        await mongoose.connect(uri, {});
        console.log('Connected to MongoDB');

        const db = mongoose.connection;
        

        //CONNECTION EVENTS
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

        // Close the connection when done
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    } catch (error) {
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
