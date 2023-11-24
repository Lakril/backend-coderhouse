import { Router } from 'express';
import { getController } from '../controllers/controllers';
import { middlewareOpt } from '../middlewares/middlewares';

export const salesRouter = Router();
salesRouter.get('/sales', getController);
salesRouter.get('/sales', middlewareOpt, getController); //app.get('/sales', middlewareOpt, getController)
