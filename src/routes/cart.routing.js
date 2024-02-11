import { Router } from 'express';
import { controller } from '../controller/cartController.js';

export const CartRouter = Router();

CartRouter.post('/carts/:pid', controller.post);
CartRouter.get('/carts/:cid', controller.get);
CartRouter.delete('/carts/:cid/products/:pid', controller.delete);
CartRouter.delete('/carts/:cid/products', controller.deleteAll);
