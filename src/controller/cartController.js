import Carts from '../dao/mongooseDB/schemas/Carts.js';

// import Product from '../dao/mongooseDB/schemas/Product.js';

export const controller = {
    postCart: async (req, res) => {
        res.json({ message: 'POST' });
        const cart = await Carts.create(req.body);

        try {
            res.status(201).json(cart.toObject());
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    post: async (req, res) => {
        const pid = Number(req.params.pid);
        const cid = req.params.cid;

        if (!cid || !pid) {
            return res.status(400).json({ message: 'Missing fields' });
        }
        try {
            const saveItem = await Carts.addItem(pid, cid);
            const calculateTotal = await Carts.calculateTotal(saveItem);
            res.json(calculateTotal);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    get: async (req, res) => {
        const cid = req.params.cid;
        if (!cid) {
            return res.status(400).json({ message: 'Missing fields' });
        }
        try {
            const cart = await Carts.findById(cid);
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            // res.json(cart);
            return res.render('cart.handlebars', { cart: cart, title: 'Cart List' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
