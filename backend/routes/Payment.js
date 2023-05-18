const express = require('express');
const router = express.Router();
const Payment = require('../models/Payments');
const Subject = require('../models/Subjects');

// POST /payments - create a new payment
router.post('/add', (req, res) => {
  const { studentId, date, month, subjects, subjectsIDs, grade, paidAmount, paymentID, notice, email } = req.body;

  const newPayment = new Payment({ studentId, date, month, subjects, subjectsIDs, grade, paidAmount, paymentID, notice, email });

  newPayment.save()
    .then((payment) => {
      res.json(payment);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

//serach payment history by Student ID
router.get('/history/:studentId', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const payments = await Payment.find({ studentId: studentId }).sort({ date: -1 });
    if (payments.length === 0) {
      return res.status(404).json({ message: 'No payment found for student ID ' + studentId });
    }
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

//search history category wise
router.get('/payHistory', async (req, res) => {
  try {
    const searchCriteria = {};
    if (req.query.subject) {
      searchCriteria.subjects = { $in: [req.query.subject] };
    }
    if (req.query.subjectID) {
      searchCriteria.subjectsIDs = { $in: [req.query.subjectID] };
    }
    if (req.query.grade) {
      searchCriteria.grade = req.query.grade;
    }
    if (req.query.month) {
      searchCriteria.month = req.query.month;
    }
    if (req.query.studentId) {
      searchCriteria.studentId = req.query.studentId;
    }
    const payments = await Payment.find(searchCriteria).sort({ date: -1 });
    res.json(payments);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});


//delete data using ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);

    if (!payment) {
      return res.status(404).send();
    }

    res.send(payment);
  } catch (error) {
    res.status(500).send(error);
  }
});



//for salary calculation get payment data
router.get('/', async (req, res) => {
  try {
    const { grade, month, subject } = req.query;

    const query = {};
    if (grade) {
      query.grade = grade;
    }
    if (month) {
      query.month = month;
    }
    if (subject) {
      query.subjects = { $in: [subject] };
    }

    const payments = await Payment.find(query);
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//total payments by given range or all-time
router.get('/income-payments', async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;

    let dateFilter = {};
    let calculationType = '';
    if (fromDate && toDate) {
      dateFilter = { date: { $gte: new Date(fromDate), $lte: new Date(toDate) } };
      calculationType = 'Given Range';
    } else {
      calculationType = 'All Time';
    }

    const payments = await Payment.find(dateFilter);

    if (payments.length === 0) {
      return res.status(404).json({ msg: 'No payments found for the given date range' });
    }

    const totalPaidAmount = payments.reduce((total, payment) => total + payment.paidAmount, 0);

    res.json({ totalPaidAmount, calculationType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while calculating the total paid amount.' });
  }
});

// Route for checking if a student has paid for a specific subject ID
router.get('/status/:studentID', async (req, res) => {
  const { studentID } = req.params;

  try {
    const payment = await Payment.findOne({
      studentId: studentID,
      subjectsIDs: '643e85131535e98f550dc499',
    });

    if (payment) {
      res.status(200).json({ paid: true });
    } else {
      res.status(200).json({ paid: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;