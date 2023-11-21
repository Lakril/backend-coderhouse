import { Router } from 'express';
import controller from '../controller/cartController';

export const ProductRouter = Router();

ProductRouter.get('/', controller.get);
// ProductRouter.get('/products/:id', controller.getById);
// ProductRouter.post('/', controller.post);

// export default ProductRouter;
