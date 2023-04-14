const express = require('express');
const router = express.Router();
const Subject = require('../models/Subjects');

// POST /api/subjects
router.post('/add', async (req, res) => {
    try {
        const { subjectName, subjectID, subjectAmount, subjectTeacherID, subjectTeacherName } = req.body;
        const newSubject = new Subject({ subjectName, subjectID, subjectAmount, subjectTeacherID, subjectTeacherName });
        await newSubject.save();
        res.status(201).json(newSubject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a subject by subjectID
router.put('/update/:_id', async (req, res) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.params._id, req.body, { new: true });
        res.json(subject);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//get list of subject data
router.get('/subjects', async (req, res) => {
    try {
        const subjects = await Subject.find().sort({ subjectName: 1 });
        res.json(subjects);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


//get subject amount by id
router.get('/amount/:_id', async (req, res) => {
    try {
        const subject = await Subject.findById(req.params._id);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        const subjectAmount = subject.subjectAmount;
        res.json({ subjectAmount });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
