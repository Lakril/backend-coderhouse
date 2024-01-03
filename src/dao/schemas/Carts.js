import { Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';

const cartSchema = new Schema(
    {
        _id: { type: String, default: randomUUID() },
        items: { type: Array, required: true },
    },
    {
        strict: 'throw',
        versionKey: false,
        methods: {
            addItem: async function (item) {
                if (!this.items.includes(item)) {
                    this.items.push(item);
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

export default model('Cart', cartSchema);
