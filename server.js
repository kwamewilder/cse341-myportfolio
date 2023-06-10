const express = require('express');
const bodyParser = require('body-parser');


const port = process.env.PORT || 8080;
const app = express();

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'https://cse341-profile.onrender.com',
  clientID: 'jjAammrRu0b42FQUqbfW9dm0Lo6aJ61Z',
  issuerBaseURL: 'https://dev-dsvwpop7ugtq47ag.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


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