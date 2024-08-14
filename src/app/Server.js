import http from 'http';
import { webRouter } from '../routes/web/web.routing.js';
import { apiRouter } from '../routes/api/apirest.routing.js';
import Sockets from '../controller/socketsController.js';
import { engine } from 'express-handlebars';
import express from 'express';
import { json, decimal } from '../middlewares/hbsHelpers.js';
import { createServerSocket } from '../middlewares/serverSocket.js';
import { passportInitialize } from '../middlewares/passport.js';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import config from '../config/index.js';
import cors from 'cors';

class Server {
    constructor() {
        this.port = config.port;
        this.host = config.host;
        this.secret = config.sessionSecret;
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.io = createServerSocket(this.httpServer);
    }

    middlewares() {
        // parse application/json
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // static files
        this.app.use('/static', express.static('./static'));
        this.app.use('/database', express.static('./database'));

        // view engine setup
        // https://github.com/express-handlebars/express-handlebars
        this.app.engine(
            '.hbs',
            engine({
                extname: '.hbs',
                helpers: { json: json, decimal: decimal },
            })
        );
        this.app.set('view engine', '.hbs');
        this.app.set('view engine', 'ejs');
        this.app.set('views', './views');

        // this.app.use(createSession(this.uri, this.secret));
        this.app.use(passportInitialize);

        // favicon
        this.app.use(favicon('./static/img/favicon.ico'));

        // restrict CORS
        this.app.use(cors());

        // parse cookies
        this.app.use(cookieParser(this.secret));
    }

    configSockets() {
        new Sockets(this.io);
    }

    routes() {
        // this.app.use(mainRouter);
        this.app.use('/', webRouter);
        this.app.use(config.api.prefix, apiRouter);
        // this.app.use(config.api.prefix, ProductRouter);
        // this.app.use(config.api.prefix, CartRouter);
    }

    start() {
        // start middlewares
        this.middlewares();
        this.routes();
        this.configSockets();

        // start server
        this.httpServer

            .listen(this.port, this.host, () => {
                console.log(`1) http://${this.host}:${this.port}/`);
                console.log(`2) http://${this.host}:${this.port}/api/products/`);
                console.log(`3) http://${this.host}:${this.port}/realtimeproducts/`);
                console.log(`4) http://${this.host}:${this.port}/chat/`);
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
                console.log('Server is running on port', this.port);
            });

        // clearConfigCache();
    }
}
export default Server;
