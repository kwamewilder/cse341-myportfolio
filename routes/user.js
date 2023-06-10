const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const authController = require('../controllers/auth');

const requireLogin = require('../authMiddleware'); 
router.get('/', requireLogin, userController.getAll);
router.get('/:username', requireLogin, userController.getUser);
router.put('/:username', requireLogin, userController.updateUser);
router.delete('/:username', requireLogin, userController.deleteUser);

module.exports = router;
