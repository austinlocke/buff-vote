const Poll = require('../models/poll.model.js');

// Create and Save a new Poll
exports.createPoll = (req, res) => {

  const poll = new Poll({
      title: req.body.title,
      owner: req.body.owner,
      access_type: {
        student: req.body.access_type.student || false,
        faculty: req.body.access_type.faculty || false,
        instructor: req.body.access_type.instructor || false
      },
      questions: req.body.questions,
      date_created: req.body.date_created,
      end_date: req.body.end_date,
  });

  // Save Poll in the database
  poll.save()
  .then(data => {
      res.status(200).send({
          status: 200,
          message: 'Poll created!',
          data: data,
      });

  }).catch(err => {
      res.status(500).send({
          error: err.message || "Some error occurred while creating the Poll."
      })
  });
};

// Find a single poll with a pollId
exports.findOnePoll = (req, res) => {
  Poll.findById(req.params.pollId)
  .then(poll => {
      if(!poll) {
          res.status(404).send({
              message: "Error: Poll not found with id " + req.params.pollId
          });
      }
      res.send(poll);
  }).catch(err => {
      res.status(500).send({
          message: "Error: Could not retrieve poll with id " + req.params.pollId
      });
  });
};

// Retrieve and return all Polls from the database.
exports.findAllPoll = (req, res) => {
  Poll.find()
  .then(poll => {
      res.send(poll);
  }).catch(err => {
      res.status(500).send({
          message: "Error occurred while retrieving all Polls."
      });
  });
};


// Find Poll using pollId and update it with the request body
exports.updatePoll = (req, res) => {
  Poll.findByIdAndUpdate(req.params.pollId, {
    title: req.body.title,
    owner: req.body.owner,
    access_type: {
      student: req.body.access_type.student || false,
      faculty: req.body.access_type.faculty || false,
      instructor: req.body.access_type.instructor || false
    },
    questions: req.body.questions,
    date_created: req.body.date_created,
    end_date: req.body.end_date,
  }, {new: true})
  .then(poll => {
      if(!poll) {
          return res.status(404).send({
              message: "Error: Poll not found with id " + req.params.pollId
          });
      }
      res.send(poll);
  }).catch(err => {
      return res.status(500).send({
          message: "Error updating poll with id " + req.params.pollId
      });
  });
};


// Delete a poll with the specified Id in the request
exports.deletePoll = (req, res) => {
  Poll.findByIdAndDelete(req.params.pollId)
  .then(poll => {
      if(!poll) {
          res.status(404).send({
              message: "Poll not found with id " + req.params.pollId
          });
      }
      res.send({message: "Poll deleted successfully!"});
  }).catch(err => {
      res.status(500).send({
          message: "Could not delete Poll with id " + req.params.pollId
      });
  });
};
