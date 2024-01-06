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

        // const myArray = req.body.title
        // console.log(myArray)

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid product id' });
        }
        try {
            const product = await Product.findById({ _id: id }).lean();
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.render('product', { product });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    post: async (req, res) => {
        res.json({ message: 'POST' });
        try {
            const product = await Product.create({
                ...req.body,
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
        res.json({ message: 'PUT' });
        const { title, description, code, price, stock, status, category, thumbnails } = req.body;
        const id = Number(req.params.pid);
        try {
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
                { new: true }
            );
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    realtime: async (req, res) => {
        return res.render('realTimeProducts.handlebars', { title: 'Real Time Products' });
    },
};
