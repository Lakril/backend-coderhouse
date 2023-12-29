import { ProductManager } from '../dao/models/ProductManager.js';
const pm = new ProductManager('./database/products.json');

export const controller = {
    index: (req, res) => {
        return res.render('index');
    },
    register: (req, res) => {
        // metodo render (nombre del index.ejs)
        return res.render('register');
    },
    login: (req, res) => {
        return res.render('login');
    },
    contact: (req, res) => {
        return res.render('contact');
    },
    home: async (req, res) => {
        try {
            const products = await pm.getProducts();
            if (!products.length) {
                return res.status(404).json({ message: 'No products found' });
            }
            // return products;
            return res.render('home.handlebars', { products: products, title: 'Products List' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
