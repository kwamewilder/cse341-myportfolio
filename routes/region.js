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

// Get users by region
router.get('/user/region/:regionName', async (req, res) => {
  const { regionName } = req.params;

  try {
    const users = await users.find({ region: regionName });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving users by region',
      error: err
    });
  }
});


module.exports = router;
