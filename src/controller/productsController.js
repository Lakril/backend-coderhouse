import { ProductManager } from '../ProductManager.js';
import path from 'path';

const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), '../../database/newDatabase.json');
const viewPath = path.join(path.dirname(new URL(import.meta.url).pathname), '../../views/index.html');

const pm = new ProductManager(filePath);

const cart = [];
export const controller = {
    get: async (req, res) => {
        res.sendFile(viewPath);
    },
    //* get product by id
    getById: async (req, res) => {
        const id = Number(req.params.id);
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
    //* get all products or limit by query
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
        res.json({ message: 'POST' });
        const { title, price, description, thumbnail, stock, code, category, status } = req.body;
        try {
            const create = await pm.addProduct({ title, price, description, thumbnail, stock, code, category, status });
            res.json(create);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
