const express = require('express');
const router = express.Router();
const mainController = require('../controller/mainController.js');

router.get('/', mainController.index);
router.get('/register', mainController.register);
router.get('/login', mainController.login);
router.get('/contact', mainController.contact);

module.exports = router;
