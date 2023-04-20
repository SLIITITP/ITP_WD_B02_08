const express = require('express');
const router = express.Router();
const AmNip = require('../models/AmNips');
const NipunUser = require('../models/NipunUsers');
const Subject = require('../models/Subjects');

// Route to add AmNip data
router.post('/amnip', async (req, res) => {
  try {
    const { date, time, subjectID, studentID } = req.body;

    // Check if the student and subject exist
    const student = await NipunUser.findOne({ studentID });
    const subject = await Subject.findOne({ subjectID });

    if (!student || !subject) {
      return res.status(400).json({ error: 'NipunUser or subject does not exist' });
    }

    // Create the AmNip data
    const amNip = new AmNip({
      date,
      time,
      subject: subject._id,
      student: student._id
    });

    await amNip.save();

    res.status(201).json({ message: 'AmNip data added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
