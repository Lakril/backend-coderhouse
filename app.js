import express from 'express';
import checkPort from './src/checkPort.js';
import { ProductManager } from './src/ProductManager.js';
import { clearConfigCache } from 'prettier';

const pm = new ProductManager('./database/products.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', async (req, res) => {
//   res.sendFile('index.html', { root: './views' });
// });

// //* get all products or limit by query
// // e.g. http://localhost:8080/products?limit=2
// app.get('/products', async (req, res) => {
//   const { limit } = req.query;
//   try {
//     const products = await pm.getProducts({ limit });
//     if (!products.length) {
//       return res.status(404).json({ message: 'No products found' });
//     }
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //* get product by id
// // e.g. http://localhost:8080/products/1
// app.get('/products/:pid', async (req, res) => {
//   const id = Number(req.params.pid);
//   if (isNaN(id)) {
//     return res.status(400).json({ message: 'Invalid product id' });
//   }
//   try {
//     const product = await pm.getProductById(id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// servidor express puerto 8080
const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Usage:
checkPort(port)
  .then((isInUse) => console.log(isInUse ? 'Port is in use' : 'Port is not in use'))
  .catch((err) => console.error(err));
