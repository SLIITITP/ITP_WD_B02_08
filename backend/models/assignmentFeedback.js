const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
 
  teachersEmail: { type: String, required: true },
  grade: { type: String, required: true },
  assignmentType:{type: String, required: true },
  message: { type: String, required: true },
  email:{type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('AssignmentFeedback', feedbackSchema);

module.exports = Feedback;
