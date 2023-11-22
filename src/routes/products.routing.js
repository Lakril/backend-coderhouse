import { Router } from 'express';
import { controller } from '../controller/productsController.js';

export const ProductRouter = Router();

ProductRouter.get('/', controller.get);
ProductRouter.post('/', controller.post);
ProductRouter.get('/products/:id', controller.getById);
ProductRouter.get('/products', controller.getProducts);

// export default ProductRouter;
