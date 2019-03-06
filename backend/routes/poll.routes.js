module.exports = (app) => {
  const poll = require('../controllers/poll.controller.js');

  // Create a new Poll
  app.post('/api/createPoll', poll.createPoll);

  // Retrieve a single poll with pollId
  app.get('/api/findOnePoll/:pollId', poll.findOnePoll);

  // Retrieve all Polls
  app.get('/api/findAllPoll', poll.findAllPoll);

  // Update a Poll with pollId
  app.put('/api/updatePoll/:pollId', poll.updatePoll);

  // Delete a Poll by passing poll _id
  app.delete('/api/deletePoll/:pollId', poll.deletePoll);
};

