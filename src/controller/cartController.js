// import { validateCode } from '../middlewares/cartNew.js';
import { Cart } from '../models/Cart.js';
import path from 'path';
import { ProductManager } from '../models/ProductManager.js';
import fs from 'fs/promises';

const filePathcart = path.join(path.dirname(new URL(import.meta.url).pathname), '../../database/cart.json');
const filePathpro = path.join(path.dirname(new URL(import.meta.url).pathname), '../../database/products.json');

const ct = new Cart(filePathcart);
const pm = new ProductManager(filePathpro);

export const controller = {
    postCart: async (req, res) => {
        const newCart = await ct.newCart();        
        return res.json(newCart);
    },
    //* get all carts
    // http://localhost:8080/api/carts/:cid
    getCartItems: async (req, res) => {
        const cid = req.params.cid
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

//! 1.1--------------------------------------------

    post: async (req, res) => {
        const pid = Number(req.params.pid);
        const cid = req.params.cid;
       
        if (!cid || !pid) {
            return res.status(400).json({ message: 'Missing fields' });
        }
        try {
            const quantity = Number(1);
            let saveItem = await ct.addItem(pid, cid, quantity, filePathpro);
            res.json(saveItem);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // // get items from cart
    // get: async (req, res) => {
    //     const cid = Number(req.params.id);
    //     const carts = await ct.getItems(cid);
    //     try {
    //         if (!carts.length) {
    //             return res.status(404).json({ message: 'Cart empty' });
    //         }
    //         res.json(carts);
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // },
};

// const ct = new Cart(filePathcart);
// const pm = new ProductManager(filePathpro);
// console.log(pm);
// console.log(ct);

// export const controller = {
//     //* Body JSON: {"quantity":20}
//     post: async (req, res) => {
//         const id = Number(req.params.id);
//         const { quantity } = req.body;

//         if (!id || !quantity) {
//             return res.status(400).json({ message: 'Missing fields' });
//         }
//         try {
//             let product = await pm.getProductById(id)
//             console.log(product);
//             let saveItem = await ct.addItem(product, id);

//             const items = await ct.getItems();
//             items.push(saveItem);
//             await fs.writeFile(filePathcart, JSON.stringify(items, null, 2));
//             res.json(items);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     },
//     // Array of products
//     get: async (req, res) => {
//         const items = await ct.getItems();
//         console.log(items);
//         try {

//             if (!items.length) {
//                 return res.status(404).json({ message: 'Cart empty' });
//             }
//             res.json(ct.getItems());
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//        }
//     },
// };
