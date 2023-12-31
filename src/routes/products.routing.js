import { Router } from 'express';
import { controller } from '../controller/productsController.js';

export const ProductRouter = Router();

ProductRouter.get('/api/products', controller.get);
ProductRouter.get('/api/products/:pid', controller.getById);
ProductRouter.post('/api/products', controller.post);
ProductRouter.delete('/api/products/:pid', controller.delete);
ProductRouter.put('/api/products/:pid', controller.put);
ProductRouter.get('/realtimeproducts', controller.realtime);

export default ProductRouter;
