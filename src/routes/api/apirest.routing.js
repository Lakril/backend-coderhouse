import { Router } from 'express';
import { UserRouter } from './users.routing.js';
import { SessionsRouter } from './sessions.routing.js';

export const apiRouter = Router();

apiRouter.use('/users', UserRouter);
apiRouter.use('/sessions', SessionsRouter);
