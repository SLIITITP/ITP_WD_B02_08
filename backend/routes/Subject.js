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

// Update a subject by subjectID
router.put('/update/:subjectID', async (req, res) => {
    try {
        const subject = await Subject.findOneAndUpdate({ subjectID: req.params.subjectID }, req.body, { new: true });
        res.json(subject);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//get list of subject data
router.get('/subjects', async (req, res) => {
    try {
      const subjects = await Subject.find();
      res.json(subjects);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

module.exports = router;
