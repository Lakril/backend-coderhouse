import { productsService } from '../services/products.service.js';

export const controller = {
    get: async (req, res, next) => {
        try {
            const products = await productsService.readMany({});
            res.result(products);
        } catch (error) {
            next(error);
        }
    },
    post: async (req, res, next) => {
        try {
            const product = req.body;
            const newProduct = await productsService.create(product);
            res.created(newProduct);
        } catch (error) {
            next(error);
        }
    },
};
