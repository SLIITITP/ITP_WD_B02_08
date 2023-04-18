// Import required modules
const mongoose = require('mongoose');

// Define SubmissionSchema
const submissionSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  assignmentId: {
    type: String,
    required: true
  },
  submittedDate: {
    type: Date,
    default: Date.now
  },
  submittedTime: {
    type: String
  },
  answerFile: {
    type: String
  }
});

// Create Submission model using SubmissionSchema
const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
