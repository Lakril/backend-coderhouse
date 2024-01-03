import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    _id: {type: Number, required: true, unique: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, default: 'No description'},
    thumbnails: {type: Array, default: ['/public/img/imagNoAvalibel.jpg']},
    stock: {type: Number, required: true},
    code: {type: String, required: true, unique: true},
    category: {type: String, required: true},
    status: {type: Boolean, default: true},
},
{
    strict: 'throw',
    versionKey: false,
});

export default model('ProductManager', productSchema);