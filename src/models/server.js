// import express from 'express';
import http from 'http';
import mainRouter from '../routes/main.routing.js';
import ProductRouter from '../routes/products.routing.js';
import CartRouter from '../routes/cart.routing.js';
import { Server as SocketIOServer } from 'socket.io';
import path from 'path';
import handlebars from 'express-handlebars';
import express from 'express';
import checkPort from '../checkPort.js';
import { clearConfigCache } from 'prettier';
import Sockets from './sockets.js';
import process from 'process';


class Server {
    constructor(port=8080) {
        this.port = process.env.PORT || port;
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.io = new SocketIOServer(this.httpServer, {});
    }
       
    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.resolve(new URL(import.meta.url).pathname, '../public')));
        this.app.engine('handlebars', handlebars.engine());
        this.app.set('view engine', 'handlebars');
        this.app.set('view engine', 'ejs');
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
            console.log(`Server running at http://localhost:${this.port}/`);
        });
        clearConfigCache();
        checkPort(this.port)
            .then((isInUse) => console.log(isInUse ? 'Port is in use' : 'Port is not in use'))
            .catch((err) => console.error(err));
    }
}

export default Server;