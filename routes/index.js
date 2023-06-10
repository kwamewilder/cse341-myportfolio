const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authController = require('../controllers/auth');


router.post('/register', authController.register); // New route for local user registration
router.post('/login', authController.login); // New route for local user login

router.use('/', require('./swagger'));
router.use('/user', require('./user'));
router.use('/region', require('./region'));



module.exports = router;
