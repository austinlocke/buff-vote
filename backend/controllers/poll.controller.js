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
    blockChain.createAsset(data).then( (info) => {
      res.status(200).send({
        status: 200,
        message: 'Poll created!',
        data: data,
      });
    }, err => {
      Poll.findByIdAndDelete(data._id)
      .then( () => {
        console.log("Poll with id \"" + data._id  + "\" was deleted because of error in creating its assets.");
      }).catch( err => {
        console.log("Error while deleting poll with id \"" + data._id  + "\" as a result of an error in creating its assets.");
      });
      res.status(500).send({
        error: "Error occured while creating asset"
      })
    })
  }).catch(err => {
      console.log(err);
      res.status(500).send({
          error: err.message || "Some error occurred while creating the Poll."
      })
  });
};

exports.votePoll = (req, res) => {
  choices = req.body;
  pollId = choices[0].pollId;
  blockChain.sendAsset(choices).then( (info) => {
    res.status(200).send({
      status: 200,
      message: 'Successfully Voted!',
    });
  }, err => {
    console.log("Error with voting in Poll with id \"" + pollId + "\"");
    console.log(err);
    res.status(500).send({
      error: "Error with voting in poll with id \"" + pollId + "\""
    })
  });
}

exports.pollResult = (req, res) => {
  pollId = req.params.pollId;
  Poll.findById(pollId)
  .then(poll => {
      if(!poll) {
          res.status(404).send({
              message: "Error: Poll not found with id " + pollId
          });
      }

      // if poll has not ended yet, just return poll
      // else return poll with results
      if( new Date(poll.end_date) >= new Date()  ) {
        console.log('Successfully retrieved active poll with id "' + pollId + '"');
        res.status(200).send(poll);
      }
      else {

        blockChain.getAssetBalance(poll).then( (assets) => {

          results = {
            _id: poll._id,
            title: poll.title,
            owner: poll.owner,
            access_type: {
              student: poll.access_type.student,
              faculty: poll.access_type.faculty,
              instructor: poll.access_type.instructor
            },
            questions: [],
            date_created: poll.date_created,
            end_date: poll.end_date,
          }

          for(let question of poll.questions) {
            let tempOption = [];
            for(let option of question.options) {
              let asset = assets.total.find( resultId => {
                return resultId.name == option._id
              });
              if(asset) {
                tempOption.push({_id: option._id, option: option.option, qty: asset.qty});
              }
            }
            results.questions.push({questionTitle: question.questionTitle, options: tempOption});
          }
          res.status(200).send(results);
        }, err => {
          console.log('Error with retrieving votes form assets in Poll with id "' + pollId + '"');
          //console.log(err);
          res.status(500).send({
            error: 'Error with retrieving votes form assets in Poll with id "' + pollId + '"'
          })
        }).catch(err => {
          console.log(err);
          res.status(500).send({
            error: 'Error with retrieving votes form assets in Poll with id "' + pollId + '"'
          })
        });
      }
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
    res.status(200).send(polls);
  }).catch(err => {
    res.status(500).send({
      message: "Error occurred while retrieving Poll with " + req.body
    })
  })
}

// Retrieve and return all Polls that has ended.
exports.findAllEndedPoll = (req, res) => {
  Poll.find( { "end_date": {$lt: new Date() } }
  ).sort( {end_date: -1, date_created: 1} ).then(polls => {
    res.status(200).send(polls);
  }).catch(err => {
    res.status(500).send({
      message: "Error occurred while retrieving Poll with " + req.body
    })
  })
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
