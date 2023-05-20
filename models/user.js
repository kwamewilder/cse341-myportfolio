module.exports = (mongoose) => {
  const userSchema = mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      default: ''
    },
    age: {
      type: Number,
      default: 0
    },
    address: {
      type: String,
      default: ''
    },
    interests: {
      type: [String],
      default: []
    },
    socialMedia: {
      type: mongoose.SchemaTypes.Mixed,
      default: {}
    }
  });

  return mongoose.model('users', userSchema);
};
