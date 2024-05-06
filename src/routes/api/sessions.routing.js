import { Router } from 'express';
import { controller } from '../../controller/userController.js';
// import { checkRole, getToken } from '../../middlewares/authorization.js';
// import checkRole from '../../middlewares/autorization.js';

export const SessionsRouter = Router();

SessionsRouter.post('/', controller.login);
SessionsRouter.delete('/current', controller.logout);
// UserRouter.post('/register', controller.register);
// UserRouter.delete('/current', controller.delete);
// UserRouter.put('/resetpassword', controller.resetPassword);
// UserRouter.get('/current', getToken, controller.userSession);
// // UserRouter.get('/current', justLoggedInApi, controller.user);
// UserRouter.put('/current', getToken, controller.updateUser);
// UserRouter.get('/admin', checkRole('admin'), (req, res) => {
//     // Only users with the 'admin' role can access this route
//     res.json({ message: 'Welcome, admin!' });
// });
// // UserRouter.post('/', controller.auth);
