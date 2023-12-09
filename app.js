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
import {webRouter}  from './src/routes/web.routing.js';	

clearConfigCache();

const app = express();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars
app.engine('handlebars', handlebars.engine());
// app.set('view engine', 'handlebars');

// EJS
app.set('view engine', 'ejs');


// app.get('/', (req, res) => {
//     let data = {
//       title: 'Home Page',
//       message: 'Welcome to the Home Page!'
//     };
  
//     res.render('home.handlebars', data);
//   });

// Routes
app.use(mainRouter);
app.use(ProductRouter);
app.use(CartRouter);
app.use('/', webRouter);

// Static files
app.use('/public', express.static('./public'));

// servidor express puerto 8080
const port = parseInt(process.env.PORT) || 8888;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// Usage:
checkPort(port)
    .then((isInUse) => console.log(isInUse ? 'Port is in use' : 'Port is not in use'))
    .catch((err) => console.error(err));


