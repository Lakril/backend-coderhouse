import { Router } from 'express';
import { controller } from '../../controller/userController.js';
import { justLoginWeb } from '../../middlewares/autorization.js';

export const UserRouter = Router();

UserRouter.get('/register', controller.getRegister);
UserRouter.get('/login', controller.getLogin);
UserRouter.get('/profile', justLoginWeb, controller.profile);
UserRouter.get('/users', controller.getUsers);
UserRouter.get('/resetpassword', controller.getResetPassword);
