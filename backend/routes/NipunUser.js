const express = require('express');
const router = express.Router();
const NipunUser = require('../models/NipunUsers');

// Add a NipunUser
router.post('/add', async (req, res) => {
    const { studentID, name } = req.body;

    try {
        const nipunUser = new NipunUser({
            studentID,
            name
        });

        await nipunUser.save();
        res.status(201).json(nipunUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
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
