import { Router } from 'express';
import { controller } from '../controller/cartController.js';

export const CartRouter = Router();

CartRouter.post('/api/carts/', controller.postCart);
CartRouter.get('/api/carts/:cid', controller.getCartItems);
CartRouter.post('/api/carts/:cid/products/:pid', controller.post);

export default CartRouter;
