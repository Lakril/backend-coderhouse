// import express from 'express';
import http from 'http';
import mainRouter from '../routes/main.routing.js';
import ProductRouter from '../routes/products.routing.js';
import CartRouter from '../routes/cart.routing.js';
import handlebars from 'express-handlebars';
import { Server as SocketIOServer } from 'socket.io';
import socketHandler from '../../public/js/index.js';
import path from 'path';

import express from 'express';



class Server {
    constructor() {
        this.port = 8888;
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketio(this.server, {});
    }
   
    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.resolve(new URL(import.meta.url).pathname, '../public')));
        this.app.engine('handlebars', handlebars.engine());
        this.app.set('view engine', 'handlebars');
        this.app.set('view engine', 'ejs');
        this.app.use(mainRouter);
        this.app.use(ProductRouter);
        this.app.use(CartRouter);
        
    }

    configurarSockets() {
        new socketHandler(this.io);
    }

    execute() {
        // start middlewares
        this.middlewares();

        // start server
        this.server.listen(this.port, () => {
            console.log(`Server running at http://localhost:${this.port}/`);
        });
    }
}

export default Server;