const express = require('express');

const router = express.Router();

const authController = require('../controller/auth');

const validateSingup = require('../middleware/singup-validator');
const validateLogin = require('../middleware/login-validator');

router.get('/login', authController.getLogin);

router.get('/singup', authController.getSingup);

router.post('/login', validateLogin, authController.postLogin);

router.post('/singup', validateSingup, authController.postSingup);

router.post('/logout', authController.postLogout);

module.exports = router;
