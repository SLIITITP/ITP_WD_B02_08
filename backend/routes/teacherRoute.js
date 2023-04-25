const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher.model');

// Get all teachers
router.get('/api/teasub/alltt', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to add a new Teacher
router.post('/api/teasub/addtea', async (req, res) => {
    try {
        // Create a new Teacher document from the request body
        const newTeacher = new Teacher(req.body);

        // Save the new document to the database
        const savedTeacher = await newTeacher.save();

        // Send the saved document as the response
        res.status(201).json(savedTeacher);
    } catch (error) {
        // Handle any errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to delete a Teacher by ID
router.delete('/api/teasub/delete/:id', async (req, res) => {
    try {
      // Find the Teacher document by ID and delete it
      const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
  
      // If no document was found, send a 404 response
      if (!deletedTeacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
  
      // Send the deleted document as the response
      res.status(200).json(deletedTeacher);
    } catch (error) {
      // Handle any errors and send an error response
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
module.exports = router;
