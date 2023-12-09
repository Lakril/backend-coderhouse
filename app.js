// Version: 1.0
// author: Jackson Rico
import express from 'express';
import checkPort from './src/checkPort.js';
import { ProductRouter } from './src/routes/products.routing.js';
import { CartRouter } from './src/routes/cart.routing.js';
import { clearConfigCache } from 'prettier';
import mainRouter from './src/routes/main.routing.js';
import process from 'process';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import http from 'http';
import socketHandlers from './public/js/index.js'

clearConfigCache();

// server express
const app = express();

// servers socket.io
// check version: http://localhost:8888/socket.io/socket.io.js
// https://cdnjs.com/libraries/socket.io
const server = http.createServer(app);

// setup socket.io
const io = new Server(server);

socketHandlers(io);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

// EJS
app.set('view engine', 'ejs');

// Routes
app.use(mainRouter);
app.use(ProductRouter);
app.use(CartRouter);

// Static files
app.use('/public', express.static('./public'));

// servidor express puerto 8080
const port = parseInt(process.env.PORT) || 8888;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// Usage:
checkPort(port)
    .then((isInUse) => console.log(isInUse ? 'Port is in use' : 'Port is not in use'))
    .catch((err) => console.error(err));
