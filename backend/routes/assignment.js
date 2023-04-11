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


// Route for getting all assignments
router.get('/assignments', async (req, res) => {
  try {
    // Fetch all assignments from the database
    const assignments = await Assignment.find();

    // Send the assignments as a JSON response
    res.status(200).json(assignments);
  } catch (err) {
    // Send an error response
    res.status(500).json({ message: err.message });
  }
});

// Route for getting a specific assignment by ID
router.get('/assignments/:id', async (req, res) => {
  try {
    // Fetch the assignment by ID from the database
    const assignment = await Assignment.findById(req.params.id);

    // If assignment not found, send an error response
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Send the assignment as a JSON response
    res.status(200).json(assignment);
  } catch (err) {
    // Send an error response
    res.status(500).json({ message: err.message });
  }
});

// Route for updating a specific assignment by ID
router.patch('/assignments/update/:id', async (req, res) => {
  try {
    // Fetch the assignment by ID from the database and update its properties
    const updatedAssignment = await Assignment.findByIdAndUpdate(req.params.id, {
      type: req.body.type,
      grade: req.body.grade,
      guidelines: req.body.guidelines,
      deadline: req.body.deadline
    }, { new: true });

    // If assignment not found, send an error response
    if (!updatedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Send the updated assignment as a JSON response
    res.status(200).json(updatedAssignment);
  } catch (err) {
    // Send an error response
    res.status(400).json({ message: err.message });
  }
});

// Route for deleting a specific assignment by ID
router.delete('/assignments/:id', async (req, res) => {
  try {
    // Fetch the assignment by ID from the database and delete it
    const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id);

    // If assignment not found, send an error response
    if (!deletedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Send a success response
    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    // Send an error response
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


