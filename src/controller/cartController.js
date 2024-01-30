import Carts from '../dao/mongooseDB/schemas/Carts.js';

export const controller = {
    post: async (req, res) => {
        const pid = Number(req.params.pid);
        const qty = Number(req.body.qty);
        // console.log(qty);

        if (!pid) {
            return res.status(400).json({ message: 'Missing fields' });
        }

        try {
            // create cart if not exists
            let cart = await Carts.find();
            if (cart.length === 0) {
                const newCart = await Carts.create({});
                await newCart.save();
                cart = await Carts.find();
            }

            // add item to cart
            const cid = cart[0]._id;
            const saveItem = await Carts.addItem(pid, cid, qty);
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
            const cart = await Carts.findById(cid).lean();
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            // res.json(cart);
            return res.render('cart.hbs', { cart: cart, title: 'My cart' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        const cid = req.params.cid;
        const pid = req.params.pid;
        // console.log(`cid: ${cid}, pid: ${pid}`);

        if (!cid || !pid) {
            return res.status(400).json({ message: 'Missing fields' });
        }
        try {
            const cart = await Carts.findById(cid);
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            // remove item from cart
            const item = cart.items.find((p) => p._id.toString() === pid.toString());
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }
            cart.items = cart.items.filter((p) => p._id.toString() !== pid.toString());
            await Carts.calculateTotal(cart);
            await cart.save();
            return res.json(cart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteAll: async (req, res) => {
        const cid = req.params.cid;
        if (!cid) {
            return res.status(400).json({ message: 'Missing fields' });
        }
        try {
            const cart = await Carts.findById(cid);
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            // remove all items from cart
            cart.items = [];
            await Carts.calculateTotal(cart);
            await cart.save();
            return res.json(cart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
