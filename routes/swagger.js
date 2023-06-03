const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const requireLogin = require('../authMiddleware'); 

router.use('/api-docs', requireLogin, swaggerUi.serve);
router.get('/api-docs', requireLogin, swaggerUi.setup(swaggerDocument));

module.exports = router;
