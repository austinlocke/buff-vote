const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request

  if(!req.body.email) {
    return res.status(400).send({
        message: "User email can not be empty"
    });
  }


  // Create a User
  const user = new User({
    fname: req.body.fname || "Untitle Name",
    lname: req.body.lname,
    email: req.body.email,
    verified: req.body.verified,
    type_of_user: req.body.type_of_user,
    hashed_pass: req.body.hashed_pass,
    classification: req.body.classification,
    major: req.body.major,
    department: req.body.department,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  });

  // Save User in the database
  user.save()
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
    });
  });
};

// Retrieve and return all user from the database.
exports.findAll = (req, res) => {
  User.find()
  .then(user => {
      res.send(user);
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
    hashed_pass: req.body.hashed_pass,
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
