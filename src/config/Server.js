// import express from 'express';
import http from 'http';
import mainRouter from '../routes/main.routing.js';
import ProductRouter from '../routes/products.routing.js';
import CartRouter from '../routes/cart.routing.js';
import { Server as SocketIOServer } from 'socket.io';
import path from 'path';
import handlebars from 'express-handlebars';
import express from 'express';
import { projectRoot, clearConfigCache } from '../utils/utils.js';
import Sockets from '../dao/fileSystem/models/Sockets.js';
import process from 'process';
import cors from 'cors';
import { dbConnection } from './database.js';


class Server {
    constructor() {
        this.port = process.env.PORT;
        this.host = process.env.HOST;
        this.uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.io = new SocketIOServer(this.httpServer, {
            /* options */
        });
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.resolve(projectRoot, './public')));
        this.app.use('/public', express.static(path.resolve(projectRoot, './public')));
        this.app.use('/database', express.static(path.resolve(projectRoot, './database')));

        // view engine setup
        this.app.set('views', path.resolve(projectRoot, './src/views'));
        // https://github.com/express-handlebars/express-handlebars
        this.app.engine('handlebars', handlebars.engine());
        this.app.set('view engine', 'handlebars');
        this.app.set('view engine', 'ejs');

        // restrict CORS
        this.app.use(cors());
    }

    configSockets() {
        new Sockets(this.io);
    }

    routes() {
        this.app.use(mainRouter);
        this.app.use(ProductRouter);
        this.app.use(CartRouter);
    }

    start() {
        // start middlewares
        this.middlewares();
        this.routes();
        this.configSockets();
        dbConnection(this.uri);


        // start server
        this.httpServer
            .listen(this.port, this.host, () => {
                // console.log(`1) http://${this.host}:${this.port}/`);
                // console.log(`2) http://${this.host}:${this.port}/api/products/`);
                // console.log(`3) http://${this.host}:${this.port}/realtimeproducts/`);
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

        clearConfigCache();
    }
}

console.log(path.resolve(projectRoot, './public'))
export default Server;
