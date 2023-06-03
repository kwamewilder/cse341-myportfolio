function requireLogin(req, res, next) {
    // Check if the user is authenticated
    if (req.oidc.isAuthenticated()) {
      // User is authenticated, allow access to the next middleware or route handler
      return next();
    }
  
    // User is not authenticated, redirect to the login page
    res.redirect('/login');
  }
  
  module.exports = requireLogin;
  