import express from 'express';
import checkPort from './src/checkPort.js';
import { ProductManager } from './src/ProductManager.js';

const pm = new ProductManager('./database/products.json');

const app = express();

//* step 2
app.get('/products', async (req, res) => {
  // const {role, limit} = req.query;
  res.json(await pm.getProducts());
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Usage:
checkPort(port)
  .then((isInUse) => console.log(isInUse ? 'Port is in use' : 'Port is not in use'))
  .catch((err) => console.error(err));
