const jwt = require('express-jwt');
const auth = jwt({
  secret: 'secret_hash',
  userProperty: 'payload'
});

module.exports = (app) => {
  const user = require('../controllers/user.controller.js');

  // Create a new user
  app.post('/api/register', user.register);

  // Send Verification Email
  app.post('/api/verification', user.sendVerificationEmail);

  // Retrieve user confirmation email, to update user verification in database
  app.post('/api/confirmation/:token', user.updateVerification);

  // Login User
  app.post('/api/login', user.login);

  app.get('/api/dashboard', auth, user.dashboard);

  // Retrieve all user
  app.get('/api/user', user.findAllUser);

  // Retrieve a single user with userId
  app.get('/api/user/:userId', user.findOneUser);

  // Update a User with userId
  app.put('/api/user/:userId', user.updateUser);

  // Delete a User with userId
  app.delete('/api/user/:userId', user.deleteUser);
};

