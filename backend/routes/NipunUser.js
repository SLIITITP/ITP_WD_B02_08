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

// Get NipunUser by ID
router.get('/id/:id', async (req, res) => {
  try {
    const nipunUser = await NipunUser.findOne({ studentID: req.params.id });
    if (nipunUser == null) {
      return res.status(404).json({ message: 'Cannot find NipunUser' });
    }
    res.json(nipunUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get NipunUser by Name
router.get('/name/:name', async (req, res) => {
  try {
    const nipunUser = await NipunUser.findOne({ name: req.params.name });
    if (nipunUser == null) {
      return res.status(404).json({ message: 'Cannot find NipunUser' });
    }
    res.json(nipunUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
