const express = require('express');
const multer = require('multer');
const Assignment = require('../models/assignment');

const router = express.Router();

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Create a Multer instance with the storage configuration
const upload = multer({ storage }).single('testimage'); // Update field name to 'testimage'

router.get('/', (req, res) => {
  res.send('Upload file');
});

// POST /assignments - Route to upload a file and create a new assignment
router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newImage = new Assignment({
        type: req.body.type,
        grade: req.body.grade,
        guidelines: req.body.guidelines,
        deadline: req.body.deadline,
        image: {
          data: req.file.filename,
          contentType: 'image/png'
        }
      });
      newImage.save()
      console.log(newImage)
        //.then(() => res.send('Successfully uploaded'))
        //.catch(err => console.log(err));
    }
  });
});


////////////////////////////////


// GET /assignments - Route to retrieve all assignments
router.get('/getAss', (req, res) => {
  Assignment.find()
    .then(assignments => res.json(assignments))
    .catch(err => res.status(500).json({ error: err.message }));
});

// GET /assignments/:id - Route to retrieve a specific assignment by ID
router.get('/getAss/:id', (req, res) => {
  Assignment.findById(req.params.id)
    .then(assignment => {
       if (!assignment) {
         //return res.status(404).json({ error: 'Assignment not found' });
       }
      res.json(assignment);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});


// Update an assignment by ID
router.put('/updateAss/:id', (req, res) => {
  const assignmentId = req.params.id;
  const updateData = req.body;

  Assignment.findByIdAndUpdate(assignmentId, updateData, { new: true })
    .then(updatedAssignment => {
      if (!updatedAssignment) {
        return res.status(404).send('Assignment not found');
      }
      res.send(updatedAssignment);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal server error');
    });
});


// DELETE /assignments/:id - Route to delete a specific assignment by ID
router.delete('/deleteAss/:id', (req, res) => {
  Assignment.findByIdAndRemove(req.params.id)
    .then(assignment => {
      if (!assignment) {
        return res.status(404).json({ error: 'Assignment not found' });
      }
      res.json({ message: 'Assignment deleted successfully' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});


module.exports = router;
