import Product from '../dao/mongooseDB/schemas/Product.js';
import productsData from '../../database/products.json' with { type: 'json' };

export const controller = {
    get: async (req, res) => {
        const { limit } = req.query;
        try {
            const products = await Product.find().limit(Number(limit)).lean();
            if (!products.length) {
                return res.status(404).json({ message: 'No products found' });
            }
            res.render('products', { products });
            // res.json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getById: async (req, res) => {
        const id = Number(req.params.pid);

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid product id' });
        }
        try {
            const product = await Product.findById({ _id: id }).lean();
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.render('product', { product: product });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    post: async (req, res) => {
        const product = await Product.create({
            ...req.body,
        });
        try {
            res.json({ message: 'POST' });
            await product.save();
            res.status(201).json(product.toObject());
            console.log(product);
            // res.status(201).render('product', { product });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        const id = Number(req.params.pid);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid product id' });
        }
        try {
            res.json({ message: 'DELETE' });
            const product = await Product.findByIdAndDelete({ _id: id });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    put: async (req, res) => {
        const { title, description, code, price, stock, status, category, thumbnails } = req.body;
        const id = Number(req.params.pid);
        const product = await Product.findByIdAndUpdate(
            { _id: id },
            {
                title,
                description,
                code,
                price,
                stock,
                status,
                category,
                thumbnails,
            },
            { new: true, runValidators: true }
        );
        try {
            res.json({ message: 'PUT' });
            await product.save();
            res.status(201).json(product.toObject());
            console.log(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    upload: async (req, res) => {
        try {
            const newProducts = await Product.upload(productsData);
            res.status(201).json(newProducts);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    realtime: async (req, res) => {
        return res.render('realTimeProducts.handlebars', { title: 'Real Time Products' });
    },
};
