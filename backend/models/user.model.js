const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
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

module.exports = mongoose.model('User', UserSchema);
