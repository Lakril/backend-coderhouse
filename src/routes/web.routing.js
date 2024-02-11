import { Router } from 'express';
import { controller } from '../controller/webController.js';

export const webRouter = Router();

webRouter.get('/challenges', controller.index);
webRouter.get('/contact', controller.contact);
webRouter.get('/', controller.home);
webRouter.get('/chat', (req, res) => {
    res.render('chat.hbs', { title: 'Chat' });
});
