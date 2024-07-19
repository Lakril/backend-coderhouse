import { Router } from 'express';
import { controller } from '../../controller/productsController.js';

export const ProductRouter = Router();

ProductRouter.get('/upload', controller.upload);
ProductRouter.get('/', controller.get);
ProductRouter.get('/:pid', controller.getById);
ProductRouter.post('/', controller.post);
ProductRouter.delete('/:pid', controller.delete);
ProductRouter.put('/:pid', controller.put);
ProductRouter.get('/realtimeproducts', controller.realtime);
