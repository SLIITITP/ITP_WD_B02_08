const express = require('express');
const router = express.Router();
const Payment = require('../models/Payments');
const Subject = require('../models/Subjects');

// POST /payments - create a new payment
// router.post('/add', (req, res) => {
//   const { studentId, date, month, subjects, subjectsIDs, grade, paidAmount, paymentID, notice } = req.body;

//   const newPayment = new Payment({ studentId, date, month, subjects, subjectsIDs, grade, paidAmount, paymentID, notice });

//   newPayment.save()
//     .then((payment) => {
//       res.json(payment);
//     })
//     .catch((error) => {
//       res.status(500).json({ error: error.message });
//     });
// });

// router.post('/add', async (req, res) => {
//   const { studentId, date, month, subjects, subjectsIDs, grade, paidAmount, paymentID, notice } = req.body;

//   try {
//     const existingPayment = await Payment.findOne({ studentId, month, grade, subjectsIDs });
//     if (existingPayment) {
//       return res.status(400).json({ error: 'Payment already exists' });
//     }

//     const newPayment = new Payment({ studentId, date, month, subjects, subjectsIDs, grade, paidAmount, paymentID, notice });
//     const savedPayment = await newPayment.save();
//     res.json(savedPayment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });



// router.post('/add', async (req, res) => {
//   const { studentId, date, month, subjects, subjectsIDs, grade, paidAmount, paymentID, notice } = req.body;

//   // // Check if a payment with the same studentId, grade, month, and subjectsIDs already exists
//   // const existingPayment = await Payment.findOne({ studentId, grade, month, subjectsIDs });

//   // if (existingPayment) {
//   //   // A payment with the same details already exists
//   //   return res.status(400).json({ error: 'Payment already exists for the same subjectIDs, student, grade, and month' });
//   // }

//   // Filter the relevant subjects based on studentId, grade, month, and subjectsIDs
//   const relevantPayments = await Payment.find({ studentId, grade, month });
//   const relevantSubjects = relevantPayments.map(payment => payment.subjects).flat();
//   console.log(relevantSubjects)

//   // Check if any of the subjects in the input array already exist in the database
//   const duplicateSubjects = subjects.filter(subject => relevantSubjects.includes(subject));

//   if (duplicateSubjects.length > 0) {
//     return res.status(400).json({ error: `Payment already exists for ${duplicateSubjects.join(', ')}` });
//   }

//   // Create a new payment
//   const payment = new Payment({
//     studentId,
//     date,
//     month,
//     subjects,
//     subjectsIDs,
//     grade,
//     paidAmount,
//     paymentID,
//     notice,
//   });

//   try {
//     // Save the new payment to the database
//     await payment.save();
//     res.status(201).json(payment);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

router.post('/add', async (req, res) => {
  const { studentId, date, month, subjects, subjectsIDs, grade, paidAmount, paymentID, notice } = req.body;

  // Check if a payment with the same studentId, grade, month, and subjectsIDs already exists
  // const existingPayment = await Payment.findOne({ studentId, grade, month, subjectsIDs });

  // if (existingPayment) {
  //   // A payment with the same details already exists
  //   return res.status(400).json({ error: 'Payment already exists for the same subjectIDs, student, grade, and month' });
  // }

  // Filter the relevant subjects based on studentId, grade, month, and subjectsIDs
  const relevantPayments = await Payment.find({ studentId, grade, month });
  const relevantSubjectsIDs = relevantPayments.map(payment => payment.subjectsIDs).flat();

  console.log(relevantPayments)
  console.log(relevantSubjectsIDs)
  // Check if any of the subject IDs in the input array already exist in the database
  const duplicateSubjects = subjects.filter(subject => relevantSubjects.includes(subject));

  const duplicateSubjectsIDs = subjectsIDs.filter(subjectID => relevantSubjectsIDs.includes(subjectID));

  console.log(duplicateSubjectsIDs)
  if (duplicateSubjectsIDs.length > 0) {
    return res.status(400).json({ error: `Payment already exists for subject IDs: ${duplicateSubjectsIDs.join(', ')}` });
  }

  // Create a new payment
  const payment = new Payment({
    studentId,
    date,
    month,
    subjects,
    subjectsIDs,
    grade,
    paidAmount,
    paymentID,
    notice,
  });

  try {
    // Save the new payment to the database
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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


module.exports = router;