const db = require('../models');
const User = db.user;

exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ message: 'Content can not be empty!' });
    }

    const user = new User(req.body);
    const data = await user.save();
    console.log(data);
    return res.status(201).send(data);
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
