const express = require('express');
const router = express.Router();
const db = require('../models');
const Region = db.region;

// Get regions
router.get('/', async (req, res) => {
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

module.exports = router;
