const express = require('express');
const router = express.Router();
const db = require('../models');
const Region = db.region;
const { requiresAuth } = require('express-openid-connect');

// Middleware to check if the user is authenticated
const requireLogin = (req, res, next) => {
  if (req.oidc.isAuthenticated()) {
    return next();
  }
  res.redirect('/login'); // Redirect to login page if not authenticated
};

// requiresAuth checks authentication.
router.get('/admin', requiresAuth(), (req, res) =>
  res.send(`Hello ${req.oidc.user.sub}, this is the admin section.`)
);

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
    const users = await User.find({ region: regionName });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving users by region',
      error: err
    });
  }
});

// Update region
router.put('/:regionId', requiresAuth(), async (req, res) => {
  const { regionId } = req.params;
  const updatedRegion = req.body;

  try {
    const region = await Region.findByIdAndUpdate(regionId, updatedRegion, { new: true });
    res.status(200).json(region);
  } catch (err) {
    res.status(500).json({
      message: 'Error updating region',
      error: err
    });
  }
});

// Delete region
router.delete('/:regionId', requiresAuth(), async (req, res) => {
  const { regionId } = req.params;

  try {
    await Region.findByIdAndDelete(regionId);
    res.status(200).json({ message: 'Region deleted successfully' });
  } catch (err) {
    res.status(500).json({
      message: 'Error deleting region',
      error: err
    });
  }
});

module.exports = router;
