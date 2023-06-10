const bcrypt = require('bcrypt');
const db = require('../models');
const jwt = require('jsonwebtoken');
const User = db.user;



exports.register = async (req, res) => {
  try {
    // Validate request
    if (!req.body.username || !req.body.password || !req.body.region || !req.body.displayName || !req.body.email || !req.body.phoneNumber) {
      return res.status(400).send({ message: 'Content cannot be empty!' });
    }

    const { username, password, region, displayName, email, phoneNumber } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).send({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ username, password: hashedPassword, region, displayName, email, phoneNumber });
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
      message: err.message || 'Some error occurred while registering the user.'
    });
  }
};

exports.login = async (req, res) => {
  // Retrieve the username and password from the request
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }

    // Compare the hashed password with the provided password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }

    // Password is valid, proceed with login logic

    const generateToken = (user) => {
        // Generate a JWT token with a secret key
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
        
        // Return the generated token
        return token;
      };
      

    // Return the token or any other relevant information as the response
    return res.status(200).send({ token, user });

  } catch (err) {
    return res.status(500).send({
      message: err.message || 'Some error occurred while logging in.'
    });
  }
};
