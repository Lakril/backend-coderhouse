import { Router } from 'express';
import { getController, postController } from '../controllers/controllers';
import { middlewareOpt } from '../middlewares/middlewares';

export const usersRouter = Router();
// app.use(controller); // esto es lo mismo que el post de abajo; get, post, put, delete, patch, etc. son metodos de http
usersRouter.get('/users', getController); //app.get('/users', getController);
usersRouter.post('/users', middlewareOpt, postController);
