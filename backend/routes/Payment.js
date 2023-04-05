const express = require('express');
const router = express.Router();
const Payment = require('../models/Payments');

// POST /payments - create a new payment
router.post('/add', (req, res) => {
  const { studentId, date, month, subjects, grade, paidAmount } = req.body;

  const newPayment = new Payment({ studentId, date, month, subjects, grade, paidAmount});

  newPayment.save()
    .then((payment) => {
      res.json(payment);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
