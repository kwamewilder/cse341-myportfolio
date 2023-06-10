const express = require('express');
const router = express.Router();
const app = express();



const userController = require('../controllers/user');

const { auth, requiresAuth } = require('express-openid-connect');

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
router.put('/:username', userController.updateUser);
router.delete('/:username', userController.deleteUser);



module.exports = router;