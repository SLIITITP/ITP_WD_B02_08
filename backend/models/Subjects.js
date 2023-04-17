const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true
  },
  subjectID: {
    type: String,
    required: true
  },
  subjectAmount: {
    type: Number,
    required: true
  },
  subjectTeacherID: {
    type: String,
    required: true
  },subjectTeacherName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Subject', subjectSchema);
