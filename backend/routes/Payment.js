const express = require('express');
const router = express.Router();
const Payment = require('../models/Payments');

// POST /payments - create a new payment
router.post('/add', (req, res) => {
  const { studentId, date, month, subjects, grade, paidAmount } = req.body;

  const newPayment = new Payment({ studentId, date, month, subjects, grade, paidAmount });

  newPayment.save()
    .then((payment) => {
      res.json(payment);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

//Search payment using student ID

// router.get('/history/:studentId', async (req, res) => {
//   try {
//     const studentId = req.params.studentId;
//     const payments = await Payment.find({ studentId: studentId });
//     if (payments.length === 0) {
//       return res.status(404).json({ message: 'No payment found for student ID ' + studentId });
//     }
//     res.json(payments);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.get('/history/:studentId', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const payments = await Payment.find({ studentId: studentId }).sort({ createdAt: 1 });
    if (payments.length === 0) {
      return res.status(404).json({ message: 'No payment found for student ID ' + studentId });
    }
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;