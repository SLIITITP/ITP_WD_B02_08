const express = require("express");
const router = express.Router();
const Class = require("../models/class");
const User = require("../models/userModel");
const Enrollment = require("../models/classEnroll");
const authMiddleware = require("../middlewares/authMiddleware");

 {/*// Add Enrollment
  router.post("/enrollments", async (req, res) => {
  try {
    const enrollment = new Enrollment({
      studentID: req.body.studentID,
      classID: req.body.classID,
    });

    const savedEnrollment = await enrollment.save();
    res.status(201).json(savedEnrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  });*/}


// enroll student
router.post("/enrollments", authMiddleware, async (req, res) => {
  try {
    const newEnroll = new Enrollment(req.body);
    console.log(req.body)
    await newEnroll.save();
    res.send({
      message: "enrolled successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});



router.post('/test',(req,res)=>{
 
  const newEnroll = new Enrollment(req.body);
  // newEnroll.save(())
  newEnroll.save().then(
    (result)=>{
      res.send(result);
    }
    ,(eror)=>{
      res.send(eror);
    }
  )
})

module.exports = router;
