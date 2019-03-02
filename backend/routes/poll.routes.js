module.exports = (app) => {
  const poll = require('../controllers/poll.controller.js');

  // Create a new Poll
  app.post('/api/createPoll', poll.createPoll);
};

