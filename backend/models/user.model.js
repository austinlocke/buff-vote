const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = mongoose.Schema({
    fname: String,
    lname: String,
    email: { type: String, required: true, unique: true },
    verified: { type: Boolean, default: false },
    type_of_user: String,
    hashed_pass: String,
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

module.exports = mongoose.model('User', UserSchema);
