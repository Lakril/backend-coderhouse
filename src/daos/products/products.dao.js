import { model } from 'mongoose';
import { ProductsDaoMongoose } from './mongoose/products.dao.mongoose.js';
import { productsSchema } from './mongoose/products.model.mongoose.js';

let productsDao;

if (!productsDao) {
    const productsModel = model('products', productsSchema);
    productsDao = new ProductsDaoMongoose(productsModel);
    console.log('Persistence layer: Mongoose');
}

export function getDaoProducts() {
    return productsDao;
}
