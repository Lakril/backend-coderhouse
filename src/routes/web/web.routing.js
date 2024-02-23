import { Router } from 'express';
import { UserRouter } from './users.routing.js';

export const webRouter = Router();

webRouter.use(UserRouter);
// webRouter.get('/', (req, res) => {
//     return res.redirect('/login');
// });
