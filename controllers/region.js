const db = require('../models');
const User = db.user;
const Region = db.region;
const requireLogin = require('../authMiddleware'); 
const bcrypt = require('bcrypt');





exports.storeRegion = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const region = new Region({
      username: user.username,
      regionName: user.region
    });

    await region.save();

    return res.send(region);
  } catch (err) {
    return res.status(500).send({
      message: 'Error storing user region',
      error: err
    });
  }
};

exports.getUsersByRegion = async (req, res) => {
  try {
    const regionName = req.params.regionName;
    const users = await User.find({ region: regionName });

    if (users.length === 0) {
      return res.status(404).send({ message: 'No users found for the specified region' });
    }

    return res.send(users);
  } catch (err) {
    return res.status(500).send({
      message: 'Error retrieving users by region',
      error: err
    });
  }
};

exports.getRegionByName = async (regionName) => {
  try {
    const region = await Region.findOne({ name: regionName });
    return region;
  } catch (err) {
    throw new Error('Error retrieving region by name');
  }
};
exports.updateRegion = async (req, res) => {
  try {
    const regionName = req.params.regionName;
    const updatedRegion = req.body;

    const region = await Region.findOneAndUpdate(
      { name: regionName },
      { $set: updatedRegion },
      { new: true }
    );

    if (!region) {
      return res.status(404).send({ message: 'Region not found' });
    }

    return res.send(region);
  } catch (err) {
    return res.status(500).send({
      message: 'Error updating region',
      error: err
    });
  }
};

exports.deleteRegion = async (req, res) => {
  try {
    const regionName = req.params.regionName;

    const region = await Region.findOneAndDelete({ name: regionName });

    if (!region) {
      return res.status(404).send({ message: 'Region not found' });
    }

    return res.send(region);
  } catch (err) {
    return res.status(500).send({
      message: 'Error deleting region',
      error: err
    });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).send({ message: 'No users found' });
    }

    return res.send(users);
  } catch (err) {
    return res.status(500).send({
      message: 'Error retrieving all users',
      error: err
    });
  }
};
