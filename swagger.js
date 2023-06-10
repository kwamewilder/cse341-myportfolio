const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();
const port = process.env.PORT || 8080;
const app = express();
const { auth } = require('express-openid-connect');

// Authentication middleware setup
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
  })
);

function requireLogin(req, res) {
  // Check if the user is authenticated
  if (req.oidc.isAuthenticated()) {
    // User is authenticated, proceed to the next middleware
    return res.redirect('/api-docs');
  }
  
  // User is not authenticated, redirect to the login page
  return res.redirect('/login');
}

// Routes
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Apply the requireLogin middleware to the routes that require authentication
app.use('/protected-page', requireLogin, (req, res) => {
  // Render the protected page
  res.send('Protected Page');
});

// Login route
app.get('/login', (req, res) => {
  // Handle the login logic here
  // After successful login, manually redirect to the protected page
  res.redirect('/api-docs');
});

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use('/', require('./routes'));

const db = require('./models');
db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.listen(port, () => {
      console.log(`DB Connected and server running on ${port}.`);
    });
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });
