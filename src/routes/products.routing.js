import { Router } from 'express';
import { controller } from '../controller/productsController.js';

export const ProductRouter = Router();

// ProductRouter.get('/', controller.get);
ProductRouter.get('/api/products/', controller.get);
ProductRouter.post('/api/products/', controller.post);
ProductRouter.delete('/api/products/:id', controller.delete);
ProductRouter.put('/api/products/:id', controller.put);
ProductRouter.get('/api/products/:pid', controller.getById, controller.product);