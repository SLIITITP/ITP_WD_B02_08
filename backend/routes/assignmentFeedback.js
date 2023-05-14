const router = require('express').Router();
let Feedback = require('../models/assignmentFeedback');
const feedback = require('../models/feedback');
const Mark = require('../models/markModel');


//create
router.route('/addFeedback').post((req, res) => {

  const  teachersName = req.body.teachersName;
  const grade = req.body.grade;
  const assignmentType = req.body.assignmentType;
 // const date = req.body.date;
  const email = req.body.email;
  const message = req.body.message;

  const newFeedback = new Feedback({
    teachersName,
    grade,
    assignmentType,
    email,
    message,
  });

  newFeedback.save()
    .then(() => res.json('Feedback added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


//get

router.route('/getFeedback').get((req, res) => {
    Feedback.find()
      .then(feedbacks => res.json(feedbacks))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  //delete


  router.delete('/deleteFeedback/:id', (req, res) => {
    Feedback.findByIdAndRemove(req.params.id)
      .then(feedback=> {
        if (!feedback) {
          return res.status(404).json({ error: 'Assignment not found' });
        }
        res.json({ message: 'Assignment deleted successfully' });
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });
  
  
// Create a new mark
router.post('/addMark', async (req, res) => {
  try {
    const mark = new Mark(req.body);
    const savedMark = await mark.save();
    res.status(201).json(savedMark);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all marks
router.get('/getMark', async (req, res) => {
  try {
    const marks = await Mark.find();
    res.json(marks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
























module.exports = router;
