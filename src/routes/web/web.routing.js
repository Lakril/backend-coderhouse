import { Router } from 'express';
// import { UserRouter } from './users.routing.js';
// import { controller } from '../../controller/userController.js';
import { controller } from '../../controller/webController.js';
// import { appendJwtCookie } from '../../middlewares/authentication.js';

export const webRouter = Router();

// webRouter.use(UserRouter);
// webRouter.get('/', (req, res) => {
//     return res.redirect('/login');
// });
webRouter.get('/register', controller.getRegister);
webRouter.get('/login', controller.getLogin);
webRouter.get('/profile', controller.getProfile);
webRouter.get('/editprofile', controller.getEdit);
webRouter.get('/resetpassword', controller.getResetPassword);
webRouter.get('/githublogin', controller.githubLogin);
webRouter.get('/githubcallback', controller.githubCallback);
webRouter.get('/', controller.getHome);
