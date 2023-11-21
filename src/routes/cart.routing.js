import express from 'express';
import controller from '../controller/cartController.js';

const CartRouter = express.Router();

CartRouter.get('/', controller.get);

export default CartRouter;
