import { Router } from 'express';
import { controller } from '../../controller/userController.js';
import { checkRole, getTokenFromCookies } from '../../middlewares/authorization.js';
// import checkRole from '../../middlewares/autorization.js';

export const UserRouter = Router();

// UserRouter.post('/login', controller.login);
UserRouter.post('/', controller.register);
UserRouter.get('/current', controller.user);
// UserRouter.get('/current', appendJwtCookie, controller.userSession);
UserRouter.patch('/', controller.resetPassword);
UserRouter.put('/current', getTokenFromCookies(), controller.updateUser);
UserRouter.get('/admin', checkRole('admin'), (req, res) => {
    // Only users with the 'admin' role can access this route
    res.json({ message: 'Welcome, admin!' });
});
// UserRouter.post('/', controller.auth);
