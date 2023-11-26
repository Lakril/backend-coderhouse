// import { validateCode } from '../middlewares/cartNew.js';
import { Cart } from '../models/Cart.js';
import { ProductManager } from '../models/ProductManager.js';
import path from 'path';
import fs from 'fs/promises';

const filePathpro = path.join(path.dirname(new URL(import.meta.url).pathname), '../../database/newDatabase.json');
const filePathcart = path.join(path.dirname(new URL(import.meta.url).pathname), '../../database/cart.json');

const ct = new Cart(filePathcart);
const pm = new ProductManager(filePathpro);

export const controller = {
    // Array of products
    get: async (req, res) => {
        const items = await ct.getItems();
        console.log(items);
        try {
    
            if (!items.length) {
                return res.status(404).json({ message: 'Cart empty' });
            }
            res.json(ct.getItems());
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //* Body JSON: {"quantity":20}
    post: async (req, res) => {
        const id = Number(req.params.id);
        const { quantity } = req.body;
        console.log(req.body);
        if (!id || !quantity) {
            return res.status(400).json({ message: 'Missing fields' });
        }
        try {
            let product = await pm.getProductById(id)
            console.log(product);
          

            let saveItem = await ct.addItem(product, id);
            
            const items = await ct.getItems();
            // const update = await ct.updateItem(id, quantity);
            // console.log(update);

            // const validate = (items, id) => {
            //     for (let item of items) {
            //         if (item.id === id) {
            //             throw new Error('Item already exists');
            //         }
            //
            items.push(saveItem);           

      
            await fs.writeFile(filePathcart, JSON.stringify(items, null, 2));
            res.json(items);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
