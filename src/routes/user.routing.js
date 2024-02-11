import { Router } from 'express';
import { controller } from '../controller/sessionController.js';
import { justLoginWeb, validateRequestBody } from '../middlewares/autorization.js';

export const UserRouter = Router();

UserRouter.get('/register', controller.getRegister);
UserRouter.get('/login', controller.getLogin);
UserRouter.get('/profile', justLoginWeb, controller.profile);
UserRouter.post('/register', controller.register);
UserRouter.post('/login', validateRequestBody, controller.login);
UserRouter.get('/users', controller.getUsers);
UserRouter.delete('/logout', controller.delete);
