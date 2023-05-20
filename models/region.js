module.exports = (mongoose) => {
  const regionSchema = mongoose.Schema({
    regionName: {
      type: String,
      enum: ['Caucasian', 'White', 'Black', 'Asian', 'Indigenous', ] 
    },
    Continent: {
      type: Number
    },
    Country: {
      type: String
    },
    State: {
      type: String
    },
    City: {
      type: String
    },
    Zip: {
      type: Number
    }
  });

  const region = mongoose.model('regions', regionSchema);

  return region;
};
