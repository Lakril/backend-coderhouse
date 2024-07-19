import { Router } from 'express';
import { UserRouter } from './users.routing.js';
import { SessionsRouter } from './sessions.routing.js';
import { centralizedResponse } from '../../middlewares/centralizedResponse.js';
import { ProductRouter } from './products.routing.js';
import { CartRouter } from './cart.routing.js';

export const apiRouter = Router();
apiRouter.use(centralizedResponse);

// apiRouter.post('/register', (req, res) => {
//     res.ok({ message: 'testinh' });
//     console.log(req.body);
// });
apiRouter.use('/users', UserRouter);
apiRouter.use('/sessions', SessionsRouter);
apiRouter.use('/products', ProductRouter);
apiRouter.use('/carts', CartRouter);

// middleware for error handling in apiRouter
// acá llegan todos los errores lanzados desde los next()!
apiRouter.use((error, req, res, next) => {
    res.status(401).json({
        status: 'error',
        message: 'authentication failed',
    })(error, req, res, next);
});
