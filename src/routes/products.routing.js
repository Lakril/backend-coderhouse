import { Router } from 'express';
import { controller } from '../controller/productsController.js';

export const ProductRouter = Router();

/*
example query: servidor:8080/api/productos?limit=10&page=2&sort=asc
page: 2prevLink: /api/productos?limit=10&page=1nextLink: /api/productos?limit=10&page=3
servidor:8080/api/productos?limit=10&page=2&sort=asc


*/

ProductRouter.get('/api/products/upload', controller.upload);
ProductRouter.get('/api/products', controller.get);
ProductRouter.get('/api/products/:pid', controller.getById);
ProductRouter.post('/api/products', controller.post);
ProductRouter.delete('/api/products/:pid', controller.delete);
ProductRouter.put('/api/products/:pid', controller.put);
ProductRouter.get('/realtimeproducts', controller.realtime);

export default ProductRouter;
