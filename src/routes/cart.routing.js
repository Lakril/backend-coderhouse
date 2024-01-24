import { Router } from 'express';
import { controller } from '../controller/cartController.js';

export const CartRouter = Router();

CartRouter.post('/api/carts/:pid', controller.post);
CartRouter.get('/api/carts/:cid', controller.get);
CartRouter.delete('/api/carts/:cid/products/:pid', controller.delete);
CartRouter.delete('/api/carts/:cid/products', controller.deleteAll);
// CartRouter.put('/api/carts/:cid/products/:pid', controller.put);
// CartRouter.put('/api/carts/:cid/products', controller.putest);

export default CartRouter;
