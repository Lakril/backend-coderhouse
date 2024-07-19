import { Router } from 'express';
import { controller } from '../../controller/cartController.js';

export const CartRouter = Router();

CartRouter.post('/:pid', controller.post);
CartRouter.get('/:cid', controller.get);
CartRouter.delete('/:cid/products/:pid', controller.delete);
CartRouter.delete('/:cid/products', controller.deleteAll);
