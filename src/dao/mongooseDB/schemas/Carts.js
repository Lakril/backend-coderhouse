import { Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';
import Product from './Product';

const cartSchema = new Schema(
    {
        _id: { type: String, default: randomUUID() },
        items: { type: Array, default: [] },
    },
    {
        strict: 'throw',
        versionKey: false,
        timestamps: true,
        methods: {
            addItem: async function (pid, cid) {
                // get product and cart
                const cart = await Product.findById(cid).lean();

                // find item in cart
                const item = cart.find((p) => p._id === pid);

                // if item exists, update quantity
                if (!this.items.includes(pid)) {
                    this.items.push(pid);
                } else {
                    item.quantity += 1;
                }
                await this.save();
            },
            getItems: async function (cid) {
                const cart = await this.findById(cid);
                if (!cart) {
                    throw new Error(`Cart with id: ${cid} not found`);
                }
                return this.items;
            },
        },
    }
);

export default model('cart', cartSchema);
