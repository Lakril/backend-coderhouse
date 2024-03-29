import http from 'http';
import { mainRouter } from '../routes/web.routing.js';
import { ProductRouter } from '../routes/products.routing.js';
import { CartRouter } from '../routes/cart.routing.js';
import { webRouter } from '../routes/web/web.routing.js';
import Sockets from '../controller/socketsController.js';
import path from 'path';
// Added import statement
import { engine } from 'express-handlebars';
import express from 'express';
import { projectRoot } from '../utils/utils.js';
import process from 'process';
import cors from 'cors';
import { dbConnection } from '../middlewares/mongoConnection.js';
import { json, decimal } from '../middlewares/hbsHelpers.js';
import { createServerSocket } from '../middlewares/serverSocket.js';
import createSession from '../middlewares/sessions.js';
import { apiRouter } from '../routes/api/apirest.routing.js';
import { passportInitialize, passportSession } from '../middlewares/passport.js';
import favicon from 'serve-favicon';

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
        // this.app.use(express.static(path.resolve(projectRoot, './public')));
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
        this.app.use(passportInitialize, passportSession);
        this.app.use(favicon('./public/img/favicon.ico'));

        // restrict CORS
        this.app.use(cors());

        // eslint-disable-next-line no-unused-vars
        // this.app.use(function (err, req, res, next) {
        //     console.error(err.stack);
        //     res.status(500).send('Something broke!');
        // });
    }

    configSockets() {
        new Sockets(this.io);
    }

    routes() {
        this.app.use(mainRouter);
        this.app.use('/', webRouter);
        this.app.use('/api', apiRouter);
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

// console.log(path.resolve(projectRoot, './src/views'));
export default Server;
