import express from 'express';
import { controller } from '../dao/fileSystem/controller/mainController.js';

const router = express.Router();

router.get('/challenges', controller.index);
router.get('/register', controller.register);
router.get('/login', controller.login);
router.get('/contact', controller.contact);
router.get('/', controller.home);
router.get('/chat', (req, res) => {
    res.render('chat.hbs', { title: 'Chat' });
});

export default router;
