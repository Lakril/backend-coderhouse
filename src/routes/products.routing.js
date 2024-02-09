import { Router } from 'express';
import { controller } from '../controller/productsController.js';

export const ProductRouter = Router();

ProductRouter.get('/products/upload', controller.upload);
ProductRouter.get('/products', controller.get);
ProductRouter.get('/products/:pid', controller.getById);
ProductRouter.post('/products', controller.post);
ProductRouter.delete('/products/:pid', controller.delete);
ProductRouter.put('/products/:pid', controller.put);
ProductRouter.get('/realtimeproducts', controller.realtime);

export default ProductRouter;
