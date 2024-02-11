import http from 'http';
import { webRouter } from '../routes/web.routing.js';
import { ProductRouter } from '../routes/products.routing.js';
import { CartRouter } from '../routes/cart.routing.js';
import { UserRouter } from '../routes/user.routing.js';
import Sockets from '../controller/socketsController.js';
import path from 'path';
import { engine } from 'express-handlebars'; // Added import statement
import express from 'express';
import { projectRoot } from '../utils/utils.js';
import process from 'process';
import cors from 'cors';
import { dbConnection } from '../middlewares/mongoConnection.js';
import { json, decimal } from '../middlewares/hbsHelpers.js';
import { createServerSocket } from '../middlewares/serverSocket.js';
import createSession from '../middlewares/sessions.js';

class Server {
    constructor() {
        this.port = process.env.PORT;
        this.host = process.env.HOST;
        this.uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
        this.secret = process.env.SESSION_SECRET;
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.io = createServerSocket(this.httpServer);
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.resolve(projectRoot, './public')));
        this.app.use('/public', express.static(path.resolve(projectRoot, './public')));
        this.app.use('/database', express.static(path.resolve(projectRoot, './database')));
        // view engine setup
        // https://github.com/express-handlebars/express-handlebars
        this.app.engine(
            '.hbs',
            engine({
                extname: '.hbs',
                helpers: {
                    json: json,
                    decimal: decimal,
                },
            })
        );
        this.app.set('view engine', '.hbs');
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.resolve(projectRoot, './src/views'));
        this.app.use(createSession(this.uri, this.secret));

        // restrict CORS
        this.app.use(cors());
    }

    configSockets() {
        new Sockets(this.io);
    }

    routes() {
        this.app.use(webRouter);
        this.app.use('/api', UserRouter);
        this.app.use('/api', ProductRouter);
        this.app.use('/api', CartRouter);
    }

    mongoConnection() {
        dbConnection(this.uri);
    }

    start() {
        // start middlewares
        this.middlewares();
        this.routes();
        this.configSockets();
        this.mongoConnection();

        // start server
        this.httpServer
            .listen(this.port, this.host, () => {
                console.log(`1) http://${this.host}:${this.port}/`);
                console.log(`2) http://${this.host}:${this.port}/api/products/`);
                console.log(`3) http://${this.host}:${this.port}/realtimeproducts/`);
                console.log(`4) http://${this.host}:${this.port}/chat/`);
                // eslint-disable-next-line
                console.log(
                    `5) http://${this.host}:${this.port}/api/products/upload/ reset database`
                );
            })
            .on('error', (err) => {
                if (err.code === 'EADDRINUSE') {
                    console.log('Address in use, retrying...');
                    setTimeout(() => {
                        this.httpServer.close();
                        this.httpServer.listen(this.port);
                    }, 1000);
                } else {
                    console.error(err);
                }
            })
            .on('listening', () => {
                console.log('Server started...');
            });

        // clearConfigCache();
    }
}

// console.log(path.resolve(projectRoot, './public'))
export default Server;
