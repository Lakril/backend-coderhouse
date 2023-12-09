import { Router } from 'express';

export const webRouter = Router();

webRouter.get('/casa', (req, res) => {
  res.render('home.handlebars', { title: 'Home' });
});