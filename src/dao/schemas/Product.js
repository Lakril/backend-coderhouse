import { Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';



const productSchema = new Schema(
    {
        _id: { type: String, default: randomUUID()},
        title: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, default: 'No description' },
        thumbnails: { type: Array, default: ['/public/img/imagNoAvalibel.jpg'] },
        stock: { type: Number, required: true },
        code: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        status: { type: Boolean, default: true },
    },
    {
        strict: 'throw',
        versionKey: false,
    }
);


export default model('products', productSchema);
