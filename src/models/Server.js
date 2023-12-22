// import express from 'express';
import http from 'http';
import mainRouter from '../routes/main.routing.js';
import ProductRouter from '../routes/products.routing.js';
import CartRouter from '../routes/cart.routing.js';
import { Server as SocketIOServer } from 'socket.io';
import path from 'path';
import handlebars from 'express-handlebars';
import express from 'express';
import { checkPort, __dirname } from '../utils.js';
import { clearConfigCache } from 'prettier';
import Sockets from './Sockets.js';
import process from 'process';
import cors from 'cors';

class Server {
    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.io = new SocketIOServer(this.httpServer, {
            /* options */
        });
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        this.app.use('/public', express.static(path.resolve(__dirname, '../public')));

        // view engine setup
        this.app.engine('handlebars', handlebars.engine());
        this.app.set('views', path.resolve(__dirname, './views'));
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

        // start server
        this.httpServer.listen(this.port, () => {
            console.log(`1) http://localhost:${this.port}/`);
            console.log(`2) http://localhost:${this.port}/api/products/`);
            console.log(`3) http://localhost:${this.port}/realtimeproducts/`);
        });
        clearConfigCache();
        checkPort(this.port)
            .then((isInUse) => console.log(isInUse ? 'Port is in use' : 'Port is not in use'))
            .catch((err) => console.error(err));
    }
}

export default Server;
