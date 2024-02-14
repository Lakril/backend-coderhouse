import { Router } from 'express';
import { controller } from '../controller/webController.js';

export const mainRouter = Router();

mainRouter.get('/challenges', controller.index);
mainRouter.get('/contact', controller.contact);
mainRouter.get('/', controller.home);
mainRouter.get('/chat', (req, res) => {
    res.render('chat.hbs', { title: 'Chat' });
});
