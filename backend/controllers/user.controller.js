const User = require('../models/user.model.js');
const mongoose = require('mongoose');
const passport = require('passport');

// Register and Save a new User
exports.register = (req, res) => {
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        verified: req.body.verified,
        type_of_user: req.body.type_of_user,
        classification: req.body.classification,
        major: req.body.major,
        department: req.body.department,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    });

    // Hash and salt password
    user.setPassword(req.body.password);

    // Save User in the database
    user.save()
    .then(data => {
        const token = user.generateJwt();
        res.status(200).send({
            status: 200,
            message: 'User created!',
            data: data,
            token: token
        });
    }).catch(err => {
        if (err.message.includes("User validation failed: email: Error, expected `email` to be unique.")) {
            res.status(422).send({
                error: err.message
            });
        } else {
            res.status(500).send({
                error: err.message || "Some error occurred while creating the User."
            });
        }
    });
};

exports.login = (req, res) => {
    passport.authenticate('local', function(err, user, info){
        var token;
    
        // If Passport throws/catches an error
        if (err) {
          res.status(404).json(err);
          return;
        }
    
        // If a user is found
        if (user) {
          token = user.generateJwt();
          res.status(200);
          res.send({
            token : token
          });
        } else {
          // If user is not found
          res.status(401).json(info);
        }
      })(req, res);
};

exports.dashboard = (req, res) => {
    // If no user ID exists in the JWT return a 401
    if (!req.payload._id) {
        res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        });
    } else {
        // Otherwise continue
        User.findById(req.payload._id)
        .exec(function(err, user) {
            res.status(200).send(user);
        });
    }
};

// Retrieve and return all user from the database.
exports.findAll = (req, res) => {
  User.find()
  .then(users => {
      res.send(users);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving user."
      });
  });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "User not found with id " + req.params.userId
          });
      }
      res.send(user);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "User not found with id " + req.params.userId
          });
      }
      return res.status(500).send({
          message: "Error retrieving user with id " + req.params.userId
      });
  });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if(!req.body.email) {
      return res.status(400).send({
          message: "User content can not be empty"
      });
  }

  // Find user and update it with the request body
  User.findByIdAndUpdate(req.params.userId, {
    Name: req.body.name || "Untitled User",
    email: req.body.email,
    verified: req.body.verified,
    type_of_user: req.body.type_of_user,
    classification: req.body.classification,
    major: req.body.major,
    department: req.body.department,
    college: req.body.college
  }, {new: true})
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "User not found with id " + req.params.userId
          });
      }
      res.send(user);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "User not found with id " + req.params.userId
          });
      }
      return res.status(500).send({
          message: "Error updating user with id " + req.params.userId
      });
  });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "User not found with id " + req.params.userId
          });
      }
      res.send({message: "User deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "User not found with id " + req.params.userId
          });
      }
      return res.status(500).send({
          message: "Could not delete User with id " + req.params.userId
      });
  });
};
