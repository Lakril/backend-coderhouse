import { Router } from 'express';
import { controller } from '../controller/cartController.js';

export const CartRouter = Router();

CartRouter.post('/api/carts/:id', controller.post);
CartRouter.get('/api/carts/products', controller.get);


