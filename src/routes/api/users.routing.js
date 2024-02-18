import { Router } from 'express';
import { controller } from '../../controller/userController.js';
import { justLoggedInApi } from '../../middlewares/autorization.js';

export const UserRouter = Router();

UserRouter.post('/login', controller.login);
UserRouter.post('/register', controller.register);
UserRouter.delete('/current', controller.delete);
UserRouter.post('/resetpassword', controller.resetPassword);
UserRouter.get('/current', justLoggedInApi, controller.userSession);
// UserRouter.get('/current', justLoggedInApi, controller.user);
UserRouter.put('/current', justLoggedInApi, controller.updateUser);
