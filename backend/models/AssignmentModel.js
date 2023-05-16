const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  TeacherID: {
    type: String,
    required: false
  },
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
