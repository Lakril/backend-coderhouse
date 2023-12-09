import express from 'express';
import { controller } from '../controller/mainController.js';

const router = express.Router();

router.get('/challenges', controller.index);
router.get('/register', controller.register);
router.get('/login', controller.login);
router.get('/contact', controller.contact);
router.get('/', controller.home);

export default router;
