import { Router } from 'express';
import { controller } from '../../controller/userController.js';
// import { justLoggedInWeb } from '../../middlewares/autorization.js';

export const UserRouter = Router();

UserRouter.get('/register', controller.getRegister);
UserRouter.get('/login', controller.getLogin);
UserRouter.get('/profile', controller.profile);
UserRouter.get('/users', controller.getUsers);
UserRouter.get('/resetpassword', controller.getResetPassword);
UserRouter.get('/githublogin', controller.githubLogin);
UserRouter.get('/githubcallback', controller.githubCallback);
UserRouter.get('/editprofile', controller.editProfile);
