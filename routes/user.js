const express = require('express');
const router = express.Router();
const app = express();

const userController = require('../controllers/user');
const { auth, requiresAuth } = require('express-openid-connect');

// Middleware to check if the user is authenticated
const requireLogin = (req, res, next) => {
  if (req.oidc.isAuthenticated()) {
    return next();
  }
  res.redirect('/login'); // Redirect to login page if not authenticated
};

app.use(
  auth({
    authRequired: false,
  })
);

// requiresAuth checks authentication.
app.get('/admin', requiresAuth(), (req, res) =>
  res.send(`Hello ${req.oidc.user.sub}, this is the admin section.`)
);

router.get('/', userController.getAll);
router.get('/:username', userController.getUser);
router.post('/', userController.create);
router.put('/:username', requiresAuth(), userController.updateUser); // Require authentication for PUT
router.delete('/:username', requiresAuth(), userController.deleteUser); // Require authentication for DELETE

module.exports = router;
