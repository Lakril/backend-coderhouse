import { Router } from 'express';
import { controller } from '../../controller/userController.js';
import { justLoggedInApi, checkRole, validateToken } from '../../middlewares/autorization.js';
// import checkRole from '../../middlewares/autorization.js';

export const UserRouter = Router();

UserRouter.post('/login', controller.login);
UserRouter.post('/register', controller.register);
UserRouter.delete('/current', controller.delete);
UserRouter.post('/resetpassword', controller.resetPassword);
UserRouter.get('/current', justLoggedInApi, validateToken, controller.userSession);
// UserRouter.get('/current', justLoggedInApi, controller.user);
UserRouter.put('/current', justLoggedInApi, controller.updateUser);
UserRouter.get('/admin', checkRole('admin'), (req, res) => {
    // Only users with the 'admin' role can access this route
    res.json({ message: 'Welcome, admin!' });
});
// UserRouter.post('/', controller.auth);
