const express = require('express');
const router = express.Router();
const NewUser = require('../models/NewUsers');

// Add new user
router.post('/add', async (req, res) => {
  try {
    const newUser = new NewUser(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
