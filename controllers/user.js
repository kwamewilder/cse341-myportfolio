const db = require('../models');
const User = db.user;
const Region = db.region;

exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.username || !req.body.password || !req.body.region) {
      return res.status(400).send({ message: 'Content can not be empty!' });
    }

    const { username, region } = req.body;

    const user = new User(req.body);
    const savedUser = await user.save();

    // Add the username to the region's list of usernames
    const regionData = await Region.findOneAndUpdate(
      { regionName: region },
      { $addToSet: { usernames: username } },
      { upsert: true }
    );

    console.log(savedUser);
    return res.status(201).send(savedUser);
  } catch (err) {
    return res.status(500).send({
      message: err.message || 'Some error occurred while creating the user.'
    });
  }
};


exports.getAll = async (req, res) => {
  try {
    const data = await User.find({});
    return res.send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || 'Some error occurred while retrieving users.'
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const username = req.params.username;
    const data = await User.find({ username: username });
    return res.send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || 'Some error occurred while retrieving users.'
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const username = req.params.username;
    const data = await User.deleteOne({ username: username });
    return res.send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || 'Some error occurred while deleting the user.'
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const username = req.params.username;
    const updates = req.body;
    const data = await User.findOneAndUpdate({ username: username }, updates, { new: true });
    return res.send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || 'Some error occurred while updating the user.'
    });
  }
};
