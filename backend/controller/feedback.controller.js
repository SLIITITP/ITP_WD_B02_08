const Feedback = require('../models/feedback');


//feedback send method
exports.feedback = async (req,res)=>{ //exporting the send method 
    try {
        //Name, materialTitle, and feedback  request from body
        const { Name,materialTitle,feedback } = req.body;
        //create new feedback
        const newFeedback = await Feedback.create({ Name, materialTitle, feedback });
        //send the feedback as a response
        res.status(200).json(newFeedback);
      } catch (err) {//catching the error
        console.error(err);
        res.status(500).json({ message: 'Server error' });//if have an error send the custom msg
      }
    };

//get all feedbacks
exports.getFeedbacks = async (req,res)=>{ //exporting the get method
    try {
        //find all feedbacks
        const feedback = await Feedback.find();
        //send the feedbacks as a response
        res.status(200).json(feedback);
        
      } catch (error) {//catching the error
        console.error(error);
        res.status(500).json({ message: 'Server error' });//if have an error send the custom msg
      }
    };

//get feedback by id
exports.getFeedback = async (req,res)=>{ //exporting the specific feedback get method
    try {
        //get the id from the request
        const {id} = req.params;
        //find the feedback by id
        const feedback = await Feedback.findById(id);
        //send the feedback as a response
        res.status(200).json(feedback);

      } catch (error) {//catching the error
        console.error(error);
        res.status(500).json({ message: 'Server error' });// send the custom msg
      }
    };

//update feedback
exports.updateFeedback = async (req, res) => { //exporting update method
    try {
    //get the id from the request
      const { id } = req.params;
        //get the Name, materialTitle, and feedback  request from body
      const { teacherName, reply } = req.body;
        //update the feedback
      const feedback = await Feedback.findByIdAndUpdate(id, {
        $push: { // pushing the replies to the feedback document
          replies: {
            teacherName,
            reply
          }
        }
      });
  //checking the feedback is stored or not
      if (!feedback) {
        return res.status(404).json({ message: 'Feedback not found' });// send the custom msg
      }
  // else feedback updated and response 
      res.json(feedback);
  
    } catch (err) {//catching the errors
      console.error(err);
      res.status(500).json({ message: 'Server error' });// send the custom msg
    }
  };


//delete feedback
exports.DeleteFeedback = async (req,res)=>{// exporting the delete method
    try {
        //get the id from the request
        const{id} = req.params;
        //delete the feedback by id
        const feedback = await Feedback.findByIdAndDelete(id);

        if (!feedback) {// checking the feedback is available or not
          return res.status(404).json({ message: 'Feedback not found' });// sending custom msg
        }
        res.json(feedback);// respond feedback deleted 

      } catch (err) {// catching the errors
        console.error(err);
        res.status(500).json({ message: 'Server error' });//send the custom msg
      }
};