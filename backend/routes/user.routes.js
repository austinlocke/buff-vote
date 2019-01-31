module.exports = (app) => {
  const user = require('../controllers/user.controller.js');

  // Create a new user
  app.post('/api/user', user.create);

  // Retrieve all user
  app.get('/api/user', user.findAll);

  // Retrieve a single user with userId
  app.get('/api/user/:userId', user.findOne);

  // Update a User with userId
  app.put('/api/user/:userId', user.update);

  // Delete a User with userId
  app.delete('/api/user/:userId', user.delete);
}

