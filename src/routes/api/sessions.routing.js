import { Router } from 'express';
import { controller } from '../../controller/sessionController.js';
import { appendJwtCookie, removeJwtCookie } from '../../middlewares/authentication.js';
// import { checkRole, getToken } from '../../middlewares/authorization.js';
// import checkRole from '../../middlewares/autorization.js';

export const SessionsRouter = Router();

// options in session login and logout
// SessionsRouter.post('/', appendJwtCookie, controller.login);
SessionsRouter.get('/current', appendJwtCookie, controller.userSession);
SessionsRouter.delete('/current', removeJwtCookie, controller.logout);
