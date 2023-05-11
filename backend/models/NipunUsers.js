const mongoose = require('mongoose');

const nipunUserSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  grade: {
    type: [Number],
    required: false
  }
});

module.exports = mongoose.model('NipunUser', nipunUserSchema);
