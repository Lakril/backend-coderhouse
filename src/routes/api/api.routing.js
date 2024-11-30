import { Router } from 'express';
// import { UserRouter } from './users.routing.js';
// import { SessionsRouter } from './sessions.routing.js';
import { centralizedResponse } from '../../middlewares/centralizedResponse.js';
import errorControl from '../../middlewares/errorControl.js';
import { ProductRouter } from './products.routing.js';
// import { CartRouter } from './cart.routing.js';

export const apiRouter = Router();

apiRouter.use(centralizedResponse);

// apiRouter.use('/users', UserRouter);
// apiRouter.use('/sessions', SessionsRouter);
apiRouter.use('/products', ProductRouter);
// apiRouter.use('/carts', CartRouter);

apiRouter.use(errorControl);
