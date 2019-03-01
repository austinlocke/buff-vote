const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    fname: String,
    lname: String,
    email: { type: String, required: true, unique: true },
    verified: { type: Boolean, default: false },
    type_of_user: String,
    hash: String,
    salt: String,
    classification: String,
    major: String,
    department: String,
    city: String,
    state: String,
    zip: String
}, {
    timestamps: true
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      fname: this.fname,
      lname: this.lname,
      verified: this.verified,
      exp: parseInt(expiry.getTime() / 1000),
    }, "secret_hash");
};

module.exports = mongoose.model('User', UserSchema);
