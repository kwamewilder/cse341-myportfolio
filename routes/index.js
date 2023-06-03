const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


router.use('/', require('./swagger'));
router.use('/user', require('./user'));
router.use('/region', require('./region'));



module.exports = router;
