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
  file:{

    type:String,
    required:true

}
});

const Assignment = mongoose.model('AssignmentList', assignmentSchema);

module.exports = Assignment;
