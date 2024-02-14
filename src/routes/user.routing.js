import { Router } from 'express';
import { controller } from '../controller/sessionController.js';
import { justLoginWeb, validateRequestBody } from '../middlewares/autorization.js';

export const UserRouter = Router();

UserRouter.get('/register', controller.getRegister);
UserRouter.post('/register', controller.register);
UserRouter.get('/login', controller.getLogin);
UserRouter.post('/login', validateRequestBody, controller.login);
UserRouter.get('/profile', justLoginWeb, controller.profile);
UserRouter.get('/users', controller.getUsers);
UserRouter.delete('/logout', controller.delete);
UserRouter.get('/resetpassword', controller.getResetPassword);
UserRouter.post('/resetpassword', controller.resetPassword);
