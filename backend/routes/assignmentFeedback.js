const router = require('express').Router();
let Feedback = require('../models/assignmentFeedback');
const feedback = require('../models/feedback');


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
  
  

  

module.exports = router;
