const mongoose = require('mongoose');

const nipunUserSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('NipunUser', nipunUserSchema);
