import Product from '../dao/schemas/Product.js';

export const controller = {
    get: async (req, res) => {
        const { limit } = req.query;
        try {
            const products = await Product.find().limit(Number(limit)).lean();
            if (!products.length) {
                return res.status(404).json({ message: 'No products found' });
            }
            res.render('products', { products });
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
            const product = await Product.find({_id:id});
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    post: async (req, res) => {
        res.json({ message: 'POST' });
        const { title, description, code, price, stock, status, category, thumbnails } = req.body;

        try {
            const product = await Product.create({
                title,
                description,
                code,
                price,
                stock,
                status,
                category,
                thumbnails,
            });
            res.status(201).json(product.toObject());
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        res.json({ message: 'DELETE' });
        const id = Number(req.params.pid);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid product id' });
        }
        try {
            const product = await Product.findByIdAndDelete({_id:id});
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
