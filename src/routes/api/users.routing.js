import { Router } from 'express';
import { controller } from '../../controller/userController.js';

export const UserRouter = Router();

UserRouter.post('/', controller.register);
UserRouter.get('/current', controller.user);
UserRouter.put('/current', controller.updateUser);
UserRouter.patch('/', controller.resetPassword);
// UserRouter.get('/current', appendJwtCookie, controller.userSession);
