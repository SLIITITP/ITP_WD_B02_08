const express = require('express');
const router = express.Router();
const AmNip = require('../models/AmNips');
const NipunUser = require('../models/NipunUsers');
const Subject = require('../models/Subjects');

//add data and check if data exist
router.post('/add', async (req, res) => {
  try {
    const { date, time, subjectID, studentID, grade } = req.body;

    // Check if the student and subject exist
    const student = await NipunUser.findOne({ studentID });
    const subject = await Subject.findOne({ subjectID });

    // Check if the same data exists with the same time
    const existingData = await AmNip.findOne({ date, subject: subject._id, student: student._id, grade });
    if (existingData) {
      return res.status(400).json({ error: 'AmNip data with the same date, subject, grade, and student already exists' });
    }

    if (!student || !subject) {
      return res.status(400).json({ error: 'NipunUser or subject does not exist' });
    }

    // Create the AmNip data
    const amNip = new AmNip({
      date,
      time,
      subject: subject._id,
      teacher: subject.subjectTeacherName,
      student: student._id,
      studentID: student.studentID,
      grade,
    });

    await amNip.save();

    res.status(201).json({ message: 'AmNip data added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Search attendance by grade, subject, date, or student ID
router.get('/search', async (req, res) => {
  try {
    const { grade, subject, date, studentID } = req.query;

    const query = {};

    if (grade) {
      query.grade = grade;
    }

    if (subject) {
      query.subject = subject;
    }

    if (date) {
      query.date = date;
    }

    if (studentID) {
      query.studentID = studentID;
    }

    const attendance = await AmNip.find(query)
      .populate('subject', 'subjectName')
      .populate('student', 'name')
      .exec();

    res.json({ attendance });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;