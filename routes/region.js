const express = require('express');
const router = express.Router();
const requireLogin = require('../authMiddleware'); 
const db = require('../models');
const Region = db.region;
const regionController = require('../controllers/region');

// Get all regions
router.get('/', requireLogin, async (req, res) => {
  try {
    const regions = await Region.find();
    res.send(regions);
  } catch (err) {
    res.status(500).send({
      message: 'Error retrieving regions',
      error: err
    });
  }
});




router.put('/:regionName', requireLogin, regionController.updateRegion);
router.delete('/:regionName', requireLogin, regionController.deleteRegion);


module.exports = router;
