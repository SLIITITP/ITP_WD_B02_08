const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
 
  subject: {
    type: String,
    required: true
  },

  grade: {
    type: String,
    required: true
  },
  guidelines: {
    type: String,
    required: false
  },
  deadline: {
    type: String,
    required: true
  },
  image:{
    data:Buffer,
    contentType:String
  }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
