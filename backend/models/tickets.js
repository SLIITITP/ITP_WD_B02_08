const mongoose = require('mongoose');
const ticketSchema = new mongoose.Schema({

  subject: {
    type: String,
    maxlength: 100,
    required: true,
    default: "",
  },
  openAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  status: {
    type: String,
    maxlength: 30,
    required: true,
    default: "Pending operator response",
  },

  details: {
    type: String,
    maxlength: 30,
   required: true,
    default: "",
  },

  message: {
    type: String,
    maxlength: 30,
   required: true,
    default: "no message",
  },

});

module.exports = mongoose.model('tickets',ticketSchema);