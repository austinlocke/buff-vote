const Poll = require('../models/poll.model.js');
const blockChain = require('../utility/blockchain.utility.js');
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
      blockChain.createAsset(data);
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

//TODO: Jonathan implements this
exports.votePoll = (req, res) => {
  console.log(req.body);
  for (let choice of req.body) {
    blockChain.sendAsset(choice.optionId);
  }

  res.status(200).send({
    message: "A-Okay!"
  });
}

exports.pollResult = (req, res) => {
  Poll.findById(req.params.pollId)
  .then(poll => {
      if(!poll) {
          res.status(404).send({
              message: "Error: Poll not found with id " + req.params.pollId
          });
      }
      //console.log(poll);
      // for(let question of poll.questions) {
      //   console.log(question.questionTitle);
      //   //for (let option of poll.questions.options) {
      //     console.log(question._id + " " + option._id);
      //     // blockChain.getAssetBalance("test").then( (result) => {
      //     //   console.log(result);
      //     // });
      //   //}
      // }

      blockChain.getAssetBalance(poll).then( (result) => {
        console.log(result);
      });


      res.send(poll);
  }).catch(err => {
      res.status(500).send({
          message: "Error: Could not retrieve poll with id " + req.params.pollId,
          error: err
      });
  });

}


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

// Retrieve and return all Polls from the database that belongs
// to a user by using a user email.
// The email is passed through params.
exports.findAllPollWithOwner = (req, res) =>  {
  Poll.find( { owner: req.params.owner }
  ).sort( {end_date: -1, date_created: 1} ).then(polls => {
    res.send(polls);
  }).catch(err => {
    res.status(500).send({
      message: "Error occurred while retrieving Poll with " + req.body
    })
  })
}


// Retrieve and return all Polls from the database that has
// the access_type pass from params.
exports.findAllPollWithAccessType = (req, res) =>  {
  field = "";
  switch(req.params.usertype) {
    case "Student":
      field = "access_type.student";
      break;
    case "Faculty":
      field = "access_type.faculty";
      break;
    case "Instructor":
      field = "access_type.instructor";
      break;
  }
  Poll.find( { [field]: true, "end_date": {$gte: new Date() }  }
  ).sort( {end_date: -1, date_created: 1} ).then(polls => {
    res.send(polls);
  }).catch(err => {
    res.status(500).send({
      message: "Error occurred while retrieving Poll with " + req.body
    })
  })
}

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

// Delete a poll with the specified Id in the request
exports.deleteAllPoll = (req, res) => {
  Poll.deleteMany()
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
