
import express from 'express';
import mainController from 'src/controller/mainController.js';

const router = express.Router();

router.get('/', mainController.index);
router.get('/register', mainController.register);
router.get('/login', mainController.login);
router.get('/contact', mainController.contact);

export default router;
