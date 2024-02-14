import { Router } from 'express';
import { controller } from '../../controller/userController.js';
import { validateRequestBody } from '../../middlewares/autorization.js';

export const UserRouter = Router();

UserRouter.post('/login', validateRequestBody, controller.login);
UserRouter.post('/register', controller.register);
UserRouter.delete('/logout', controller.delete);
UserRouter.post('/resetpassword', controller.resetPassword);
