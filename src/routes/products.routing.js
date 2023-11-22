import { Router } from 'express';
import { controller } from '../controller/productsController.js';

export const ProductRouter = Router();

ProductRouter.get('/', controller.get);
ProductRouter.get('/products/:id', controller.getById);
ProductRouter.get('/products', controller.getProducts);
ProductRouter.post('/product', controller.post);

// export default ProductRouter;
