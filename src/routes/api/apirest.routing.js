import { Router } from 'express';
import { UserRouter } from './users.routing.js';
import { SessionsRouter } from './sessions.routing.js';
// import { respuestasMejoradas } from '../../middlewares/respuestasMejoradas.js';

export const apiRouter = Router();
// apiRouter.use(respuestasMejoradas);

// apiRouter.post('/register', (req, res) => {
//     res.ok({ message: 'testinh' });
//     console.log(req.body);
// });
apiRouter.use('/users', UserRouter);
apiRouter.use('/sessions', SessionsRouter);

// middleware for error handling in apiRouter
// acá llegan todos los errores lanzados desde los next()!
apiRouter.use((error, req, res, next) => {
    res.status(401).json({
        status: 'error',
        message: 'authentication failed',
    })(error, req, res, next);
});
