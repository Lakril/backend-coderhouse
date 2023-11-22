import { Router } from 'express';
import { controller } from '../controller/productsController.js';

export const ProductRouter = Router();

ProductRouter.get('/', controller.get);
ProductRouter.post('/', controller.post);
ProductRouter.post('/:id', controller.delete);
ProductRouter.post('/:id', controller.put);
ProductRouter.get('/products', controller.getProducts);
ProductRouter.get('/products/:id', controller.getById);

// export default ProductRouter;
