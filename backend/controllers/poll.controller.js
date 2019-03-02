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
