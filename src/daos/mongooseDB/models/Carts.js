import { Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';
import Product from './Product.js';

const cartSchema = new Schema(
    {
        _id: { type: String, default: randomUUID() },
        items: { type: Array, default: [] },
        totalQty: { type: Number, default: 0 },
        totalPrice: { type: Number, default: 0 },
    },
    {
        strict: 'throw',
        versionKey: false,
        timestamps: true,
        statics: {
            // addItem and updateItem quantity = Populate
            addItem: async function (pid, cid, qty) {
                // get product and cart
                const cart = await this.findById({ _id: cid });
                if (!cart) {
                    throw new Error(`Cart with id: ${cid} not found`);
                }

                // find item in cart
                const item = cart.items.find((p) => p._id.toString() === pid.toString());

                // if item exists, update quantity and price
                if (item) {
                    // update quantity item and total price
                    cart.items = cart.items.map((p) => {
                        if (p._id.toString() === pid.toString()) {
                            p.quantity += qty;
                            p.totalPrice = p.price * p.quantity;
                        }
                        return p;
                    });
                    await cart.updateOne(cart);
                    return cart;
                } else {
                    // get product
                    const product = await Product.findById({ _id: pid }).lean();
                    // create new item
                    const newItem = {
                        _id: product?._id,
                        title: product?.title,
                        price: product?.price,
                        image: product?.thumbnails,
                        quantity: qty,
                        totalPrice: product?.price,
                    };
                    // add item to cart
                    cart.items.push(newItem);
                }
                await cart.save();
                return cart;
            },
            calculateTotal: async function (cart) {
                const sum = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);
                cart.totalPrice = sum;
                const totalQty = cart.items.reduce((acc, item) => acc + item.quantity, 0);
                cart.totalQty = totalQty;
                await cart.save();
                return cart;
            },
        },
    }
);

export default model('cart', cartSchema);
