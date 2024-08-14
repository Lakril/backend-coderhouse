import { Schema } from 'mongoose';
import { randomUUID } from 'node:crypto';

const productsSchema = new Schema(
    {
        _id: { type: Number, default: randomUUID },
        title: {
            type: String,
            required: [true, 'You must provide an title.'],
            trim: true,
        },
        description: { type: String, required: true },
        code: { type: String, required: true, unique: true },
        price: { type: Number, min: 0, required: true },
        stock: { type: Number, required: true },
        thumbnails: { type: Array, default: ['/static/img/imagNoAvalibel.jpg'] },
        category: { type: String, required: true },
        status: { type: Boolean, default: true },
    },
    {
        strict: 'throw',
        varionKey: false,
    }
);

export default productsSchema;
