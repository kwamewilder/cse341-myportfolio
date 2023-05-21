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

router.get('/region/:regionName', async (req, res) => {
  try {
    const regionName = req.params.regionName;

    // Retrieve users by region name from your database
    // eslint-disable-next-line no-undef
    const users = await User.find({ region: regionName });

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err });
  }
});


module.exports = router;
