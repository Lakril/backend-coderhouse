// Version: 1.0
// author: Jackson Rico
import { app } from './app/app.js';
import { connect } from './database/database.js';

await connect();
await app.start();
