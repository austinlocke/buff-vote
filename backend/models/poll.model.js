const mongoose = require('mongoose');

const PollSchema = mongoose.Schema({
  title: String,
  owner: String,
  access_type: {
    student: { type: Boolean, default: false },
    faculty: { type: Boolean, default: false },
    instructor: { type: Boolean, default: false }
  },
  questions: [{
    questionTitle: String,
    options: [ {
      option: String
    }]
  }],
  date_created: Date,
  end_date: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Poll', PollSchema);
