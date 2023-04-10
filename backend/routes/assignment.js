const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignment'); // Import the Assignment model

// Route for adding a new assignment
router.post('/assignments/add', async (req, res) => {
  try {
    // Create a new assignment object with data from the request body
    const newAssignment = new Assignment({
      type: req.body.type,
      grade: req.body.grade,
      guidelines: req.body.guidelines,
      deadline: req.body.deadline
    });

    // Save the new assignment to the database
    const savedAssignment = await newAssignment.save();

    // Send a success response
    
    res.status(201).json("Assignment saved successfully");
    
  } catch (err) {
    // Send an error response
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
