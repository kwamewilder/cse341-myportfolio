const db = require('../models');
const region = db.region;

exports.getregion = async (req, res) => {
  try {
    const regionName = req.params.regionName;
    const data = await region.find({ regionName: regionName });

    if (data.length === 0) {
      res.status(404).send({ message: 'Not found region with name: ' + regionName });
    } else {
      res.send(data[0]);
    }
  } catch (err) {
    res.status(500).send({
      // eslint-disable-next-line no-undef
      message: 'Error retrieving region with regionName=' + regionName,
      error: err
    });
  }
};
