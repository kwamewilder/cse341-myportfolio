const db = require('../models');
const User = db.user;
const Region = db.region;

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
