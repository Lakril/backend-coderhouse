// Version: 1.0
// author: Jackson Rico
import { app } from './app/app.js';
import { connect } from './database/database.js';

connect();
app.start();
