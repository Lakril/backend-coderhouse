import mongoose, { Schema } from 'mongoose';
import { randomUUID } from 'node:crypto';
import AutoIncrementFactory from 'mongoose-sequence';
import mongoosePaginate from 'mongoose-paginate-v2';

const AutoIncrement = AutoIncrementFactory(mongoose);

export const productsSchema = new Schema(
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
        _id: false,
    }
);

productsSchema.pre('save', function (next) {
    this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
    next();
});

productsSchema.plugin(AutoIncrement, { start_seq: 21 });
productsSchema.plugin(mongoosePaginate);
