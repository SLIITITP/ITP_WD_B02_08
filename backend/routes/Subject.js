const express = require('express');
const router = express.Router();
const Subject = require('../models/Subjects');

// POST /api/subjects
router.post('/add', async (req, res) => {
  try {
    const { subjectName, subjectID, subjectAmount, subjectTeacherID } = req.body;
    const newSubject = new Subject({ subjectName, subjectID, subjectAmount, subjectTeacherID });
    await newSubject.save();
    res.status(201).json(newSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
