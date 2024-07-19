import { Router } from 'express';
import { controller } from '../../controller/sessionController.js';

export const SessionsRouter = Router();

// options in session login and logout
SessionsRouter.post('/', controller.login);
SessionsRouter.get('/current', controller.userSession);
SessionsRouter.delete('/current', controller.logout);
