// Version: 1.0
// author: Jackson Rico
import Server from './src/models/Server.js';
import dotenv from 'dotenv';
dotenv.config();

const server = new Server();
server.start();
