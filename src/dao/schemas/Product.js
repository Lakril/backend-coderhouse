import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        _id: Number,
        title: { type: String, required: true, trim: true },
        description: { type: String, default: 'No description' },
        code: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        thumbnails: { type: Array, default: ['/public/img/imagNoAvalibel.jpg'] },
        category: { type: String, required: true },
        status: { type: Boolean, default: true },
    },
    {
        strict: 'throw',
        versionKey: false,
        _id: false,
    }
);

productSchema.pre('save', function (next) {
    this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
    next();
});

productSchema.plugin(AutoIncrement);

export default mongoose.model('products', productSchema);
