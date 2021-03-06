module.exports = (app) => {
  const poll = require('../controllers/poll.controller.js');

  // Create a new Poll
  app.post('/api/createPoll', poll.createPoll);

  // Vote in a poll
  app.post('/api/votePoll/:pollId', poll.votePoll);

  // Retrieve a single poll with pollId and if ended, returns with results
  app.get('/api/pollResult/:pollId', poll.pollResult);

  // Retrieve a single poll with pollId
  app.get('/api/findOnePoll/:pollId', poll.findOnePoll);

  // Retrieve all Polls
  app.get('/api/findAllPoll', poll.findAllPoll);

  // Retrieve all Polls with owner
  app.get('/api/findAllPoll/owner/:owner', poll.findAllPollWithOwner);

  // Retrieve all Polls with a user type
  app.get('/api/findAllPoll/:userId/:usertype', poll.findAllPollWithAccessType);

  // Retrieve all Polls that has ended
  app.get('/api/findAllEndedPoll', poll.findAllEndedPoll);

  // Update a Poll with pollId
  app.put('/api/updatePoll/:pollId', poll.updatePoll);

  // Delete a Poll by passing poll _id
  app.delete('/api/deletePoll/:pollId', poll.deletePoll);

  // Delete a Poll by passing poll _id
  app.delete('/api/deleteAllPoll', poll.deleteAllPoll);
};

