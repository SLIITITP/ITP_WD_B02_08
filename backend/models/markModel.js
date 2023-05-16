const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  fileId: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  AssignmentType: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
});

const Mark = mongoose.model('Mark', markSchema);

module.exports = Mark;
