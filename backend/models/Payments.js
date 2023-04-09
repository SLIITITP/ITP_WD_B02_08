const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  month: {
    type: String,
    required: true,
  },
  subjects: {
    type: [String],
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  paidAmount: {
    type: Number,
    required: true,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
