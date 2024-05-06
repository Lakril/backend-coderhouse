import { Router } from 'express';
// import { UserRouter } from './users.routing.js';
import { controller } from '../../controller/userController.js';

export const webRouter = Router();

// webRouter.use(UserRouter);
// webRouter.get('/', (req, res) => {
//     return res.redirect('/login');
// });
webRouter.get('/login', controller.getLogin);
webRouter.get('/register', controller.getRegister);
webRouter.get('/profile', controller.getProfile);
webRouter.get('/editprofile', controller.getEdit);
webRouter.get('/', (req, res) => {
    res.sendFile('index.html', { root: './src/views' });
});
