const express = require('express');
const router = express.Router();

const regionController = require('../controllers/region');

router.get('/:regionName', regionController.getregion);

module.exports = router;
