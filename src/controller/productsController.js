import { ProductManager } from '../models/ProductManager.js';
import path from 'path';

const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), '../../database/newDatabase.json');
const viewPath = path.join(path.dirname(new URL(import.meta.url).pathname), '../../views/index.html');

const pm = new ProductManager(filePath);


export const controller = {
    // get: async (req, res) => {
    //     res.sendFile(viewPath);
    // },
    //* get product by id
    getById: async (req, res) => {
        const id = Number(req.params.pid);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid product id' });
        }
        try {
            const product = await pm.getProductById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.render('product', { product });
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //* get all products or limit by query
    // http://localhost:8080/products?limit5
    get: async (req, res) => {
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
        res.json({ message: 'POST' });
        const { title, description, code, price, stock, status, category, thumbnails } = req.body;

        try {
            const create = await pm.addProduct({
                title,
                description,
                code,
                price,
                stock,
                status,
                category,
                thumbnails,
            });
            res.json(create);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //* get product by id
    delete: async (req, res) => {
        res.json({ message: 'DELETE' });
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid product id' });
        }
        try {
            const deleted = await pm.deleteProduct(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(deleted);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    put: async (req, res) => {
        res.json({ message: 'PUT' });
        const { title, description, code, price, stock, status, category, thumbnails } = req.body;
        const id = Number(req.params.id);
        try {
            const updated = await pm.updateProduct(id, {
                title,
                description,
                code,
                price,
                stock,
                status,
                category,
                thumbnails,
            });
            res.json(updated);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    product: async (req,res)=>{
        try {
            // Step 1: Fetch the product data
            const product = await pm.getProductById(id);
            console.log(product);
    
            // Step 2: Render the product.ejs template with the product data
            res.render('product', { product });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};