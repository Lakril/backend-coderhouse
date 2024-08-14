import { dbConnection } from './mongoConnection.js';
import config from '../config/index.js';

export async function connect() {
    if (config.modeEjecution === 'online') {
        await dbConnection(config.mongooseConnection.databaseURL);
        console.log('connected to mongodb online');
    } else {
        await dbConnection(config.mongooseConnection.databaseURLLocal);
        console.log('connected to mongodb local');
    }
}
