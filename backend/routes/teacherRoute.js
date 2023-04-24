const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher.model');

// Route to get all teachers
router.get('/all', async (req, res) => {
  try {
    const teachers = await Teacher.find({});
    res.status(200).json(teachers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all teachers
router.get('/alltt', async (req, res) => {
    try {
      const teachers = await Teacher.find();
      res.json(teachers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
