import express from 'express';
import checkPort from './src/checkPort.js';

import { ProductRouter } from './src/routes/products.routing.js';
// import {CartRouter} from './src/routes/cart.routing.js';
import { clearConfigCache } from 'prettier';
clearConfigCache();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ProductRouter);
// app.use(CartRouter);

// servidor express puerto 8080
const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// Usage:
checkPort(port)
    .then((isInUse) => console.log(isInUse ? 'Port is in use' : 'Port is not in use'))
    .catch((err) => console.error(err));
