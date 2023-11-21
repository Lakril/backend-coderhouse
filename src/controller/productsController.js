import { ProductManager } from '../ProductManager.js';
const pm = new ProductManager('../database/products.json');
console.log(pm);
const cart = [];
const controller = {
    get: async (req, res) => {
        res.sendFile('index.html', { root: './views' });
    },
    getById: async (req, res) => {
        const id = req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid product id' });
        }
        try {
            const product = await pm.getProductById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getProducts: async (req, res) => {
        const { limit } = req.query;
        try {
            const products = await pm.getProducts({ limit });
            if (!products.length) {
                return res.status(404).json({ message: 'No products found' });
            }
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    post: async (req, res) => {
        const product = req.body;
        if (!pm.isValidProduct(product)) {
            return res.status(400).json({ message: 'Invalid product' });
        }
        cart.push(product);
        res.json(cart);
    },
};

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

// //* get all products or limit by query
// // e.g. http://localhost:8080/products?limit=2
app.get('/products', async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await pm.getProducts({ limit });
        if (!products.length) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// app.get('/', async (req, res) => {
//   res.sendFile('index.html', { root: './views' });
// });

module.exports = controller;
