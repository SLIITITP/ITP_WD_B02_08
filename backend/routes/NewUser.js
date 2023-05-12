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

// Get all users
router.get('/all', async (req, res) => {
    try {
        const users = await NewUser.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Delete student data by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedStudent = await NewUser.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

//update registerd students
router.put('/register/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const user = await NewUser.findOneAndUpdate(
        { _id: id },
        { $set: { registered: true } },
        { new: true }
      );
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
module.exports = router;
