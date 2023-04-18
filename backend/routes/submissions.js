// Import required modules
const express = require('express');
const multer = require('multer'); // For handling file uploads
const Submission = require('../models/submission'); // Import Mongoose model for Submission

// Create an instance of Express router
const router = express.Router();

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'submissions/'); // Specify the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
  }
});
const upload = multer({ storage });

// POST route for submitting an answer
router.post('/submit', upload.single('answerFile'), async (req, res) => {
  try {
    // Extract submission data from request body
    const { studentId, assignmentId, submittedTime } = req.body;

    // Create a new Submission document using Mongoose model
    const submission = new Submission({
      studentId,
      assignmentId,
      submittedTime,
      answerFile: req.file ? req.file.path : null // Save file path if uploaded, otherwise null
    });

    // Save the submission to the database
    await submission.save();

    // Send success response
    res.status(201).json({ message: 'Submission created successfully' });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Failed to create submission' });
  }
});

// GET route for fetching all submissions
router.get('/submissions', async (req, res) => {
  try {
    // Fetch all submissions from the database
    const submissions = await Submission.find();

    // Send success response with submissions data
    res.status(200).json({ submissions });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// GET route for fetching a specific submission by ID
router.get('/submissions/:id', async (req, res) => {
  try {
    // Fetch submission by ID from the database
    const submission = await Submission.findById(req.params.id);

    // Send success response with submission data
    res.status(200).json({ submission });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Failed to fetch submission' });
  }
});

// GET route for downloading submitted file
router.get('/submissions/:id/download', async (req, res) => {
  try {
    // Fetch submission by ID from the database
    const submission = await Submission.findById(req.params.id);

    // If submission found and file path exists, send file for download
    if (submission && submission.answerFile) {
      res.download(submission.answerFile);
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Failed to download file' });
  }
});

// PUT route for updating a specific submission by ID
router.put('/submissions/:id', async (req, res) => {
  try {
    // Extract submission data from request body
    const { studentId, assignmentId, submittedTime } = req.body;

    // Find submission by ID and update the fields
    await Submission.findByIdAndUpdate(req.params.id, {
      studentId,
      assignmentId,
      submittedTime,
      answerFile
    });

    // Send success response
    res.status(200).json({ message: 'Submission updated successfully' });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Failed to update submission' });
  }
});


   
    module.exports = router;