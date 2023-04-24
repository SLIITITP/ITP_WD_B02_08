const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher.model');

// Route to get all teachers
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find({});
    res.status(200).json(teachers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
