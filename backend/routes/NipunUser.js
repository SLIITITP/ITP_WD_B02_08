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


// Get NipunUser by ID
// router.get('/search/:id', async (req, res) => {
//     try {
//         const nipunUser = await NipunUser.findOne({ studentID: req.params.id });
//         if (nipunUser == null) {
//             return res.status(404).json({ message: 'Cannot find User by ID' });
//         }
//         res.json(nipunUser);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Get NipunUser by Name
// router.get('/search/:name', async (req, res) => {
//     try {
//         const nipunUser = await NipunUser.findOne({ name: req.params.name });
//         if (nipunUser == null) {
//             return res.status(404).json({ message: 'Cannot find User by Name' });
//         }
//         res.json(nipunUser);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

module.exports = router;
