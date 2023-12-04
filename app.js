import express from 'express';
import checkPort from './src/checkPort.js';

import { ProductRouter } from './src/routes/products.routing.js';
import { CartRouter } from './src/routes/cart.routing.js';
import { clearConfigCache } from 'prettier';
const mainRouter = require('./src/routes/main.routing.js');

clearConfigCache();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// EJS
app.set('view engine', 'ejs');

// Routes
app.use(mainRouter);
app.use(ProductRouter);
app.use(CartRouter);

// Static files
app.use('/public', express.static('./public'));

// servidor express puerto 8080
const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// Usage:
checkPort(port)
    .then((isInUse) => console.log(isInUse ? 'Port is in use' : 'Port is not in use'))
    .catch((err) => console.error(err));
