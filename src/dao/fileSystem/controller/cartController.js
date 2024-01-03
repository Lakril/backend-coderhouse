import { Cart } from '../models/Cart.js';


const ct = new Cart('./database/cart.json');

export const controller = {
    //* create a new cart
    // http://localhost:8080/api/carts
    postCart: async (req, res) => {
        const newCart = await ct.newCart();
        return res.json(newCart);
    },
    //* get all carts
    // http://localhost:8080/api/carts/:cid
    getCartItems: async (req, res) => {
        const cid = req.params.cid;
        try {
            const items = await ct.getItems(cid);
            if (!items.length) {
                return res.status(404).json({ message: 'No items found' });
            }
            res.json(items);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //* add item to cart
    // http://localhost:8080/api/carts/:cid/products/:pid
    post: async (req, res) => {
        const pid = Number(req.params.pid);
        const cid = req.params.cid;

        if (!cid || !pid) {
            return res.status(400).json({ message: 'Missing fields' });
        }
        try {
            const quantity = Number(1);
            let saveItem = await ct.addItem(pid, cid, quantity, './database/products.json');
            res.json(saveItem);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
