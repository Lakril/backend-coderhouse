import { productsService } from '../services/products.service.js';

export const controller = {
    get: async (req, res, next) => {
        try {
            // const { sort = { _id: 1 } } = req.query;
            const options = {
                pagination: req.query.pagination === 'false' ? false : true,
                page: parseInt(req.query.page) || 1,
            };
            console.log(req.query);
            const products = await productsService.readMany({}, options);
            // console.log(req.query);
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
