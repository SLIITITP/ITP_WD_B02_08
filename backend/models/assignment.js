const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  guidelines: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
