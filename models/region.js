module.exports = (mongoose) => {
  const regionSchema = mongoose.Schema({
    usernames: {
      type: [String],
      required: true
    },
    regionName: {
      type: String,
      required: true
    }
   
  });

  const region = mongoose.model('regions', regionSchema);

  return region;
};
