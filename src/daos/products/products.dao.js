import { model } from 'mongoose';
import { ProductsDaoMongoose } from './mongoose/products.dao.mongoose.js';
import { productsSchema } from './mongoose/products.model.mongoose.js';

const RUTA_PRODUCTS_JSON = '../../../db/products.json';
let productsDao;

if (!productsDao) {
    const productsModel = model('products', productsSchema);
    productsDao = new ProductsDaoMongoose(productsModel);
    console.log('Persistence layer: Mongoose');
} else {
    productsDao = new ProductsDaoMongoose(RUTA_PRODUCTS_JSON);
}

export function getDaoProducts() {
    return productsDao;
}
