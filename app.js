// Version: 1.0
// author: Jackson Rico
import Server from './src/config/Server.js';
// import dotenv from 'dotenv';
import 'dotenv/config';
// dotenv.config();

const server = new Server();
server.start();
