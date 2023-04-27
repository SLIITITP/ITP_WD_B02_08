const express = require("express");
const router = express.Router();
const Class = require("../models/class");
const User = require("../models/userModel");
const Enrollment = require("../models/classEnroll");
const authMiddleware = require("../middlewares/authMiddleware");

// enroll student
router.post("/enrollments", async (req, res) => {
  try {
    const { studentID, classID } = req.body;
    const enrollment = await Enrollment.findOne({ studentID });
    if (enrollment) {
      if (enrollment.classID.includes(classID)) {
        return res.status(400).json({ message: "Already enrolled",success: false  });
      } else {
        enrollment.classID.push(classID);
        await enrollment.save();
         res.send({
         message: "enrolled successfully",
         success: true,
        });
      }
    }  else {
      // Student has not enrolled in any classes before
      const newEnrollment = new Enrollment({ studentID, classID: [classID] });
      await newEnrollment.save();
      res.send({
      message: "enrolled successfully",
      success: true,
    });
    }

  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// get enrolled classes for a student
router.get("/enrollments/:studentID", async (req, res) => {
  try {
    let studentId = req.body.studentID;
    const enrollment = await Enrollment.findOne({ studentId });
    if (!enrollment) {
      return res.status(404).json({ message: "No enrollments found", success: false });
    }
    res.send({
      message: "Enrollments retrieved successfully",
      data: enrollment.classID,
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


module.exports = router;
