const express = require('express');
const router = express.Router();
const NipunUser = require('../models/NipunUsers');

// Add a NipunUser
router.post('/add', async (req, res) => {
    try {
        const existingUser = await NipunUser.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = new NipunUser(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
});


//get lsit of students
router.get('/list', async (req, res) => {
    try {
        const students = await NipunUser.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Delete student data by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedStudent = await NipunUser.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET /api/search/:searchTerm
router.get('/search/:searchTerm', async (req, res) => {
    try {
        const searchTerm = req.params.searchTerm;
        const searchRegex = new RegExp(searchTerm, 'i');
        const results = await NipunUser.find({ $or: [{ studentID: searchRegex }, { name: searchRegex }] });
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET route to find a student by ID
router.get('/students/:studentId', async (req, res) => {
    const { studentId } = req.params;
    try {
        const student = await NipunUser.findOne({ _id: studentId }).exec();
        if (!student) {
            return res.status(404).send('Student not found');
        }
        return res.json(student);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
});

router.put('/students/:studentId', async (req, res) => {
    const { studentId } = req.params;
    try {
        const student = await NipunUser.findOneAndUpdate({ _id: studentId }, req.body, {
            new: true,
            runValidators: true,
        }).exec();
        if (!student) {
            return res.status(404).json({ message: 'Student Not Found' });
        }
        return res.status(200).json({ message: 'Student Updated succesfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
});




















//checking for ID generate
router.get('/checkID/:studentID', async (req, res) => {
    const studentID = req.params.studentID;
    try {
        const student = await NipunUser.findOne({ studentID: studentID });
        if (student) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


router.get('/ccheckID/:studentID', async (req, res) => {
    const { studentID } = req.body;

    try {
        const existingStudent = await NipunUser.findOne({ studentID });
        if (existingStudent) {
            res.json({ exists: true });
            console.log("exist");
        } else {
            res.json({ exists: false });
            console.log("Not exist");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to check student ID.' });
    }
});


module.exports = router;
