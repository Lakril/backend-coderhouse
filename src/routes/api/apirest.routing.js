import { Router } from 'express';
import { UserRouter } from './users.routing.js';

export const apiRouter = Router();

apiRouter.use('/sessions', UserRouter);
