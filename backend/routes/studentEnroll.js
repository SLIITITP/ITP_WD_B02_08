const express = require("express");
const router = express.Router();
const Enrollment = require("../models/classEnroll");

// Add Enrollment
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
});

{/*// Get All Enrollments
router.get("/enrollments", async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Single Enrollment
router.get("/enrollments/:id", getEnrollment, (req, res) => {
  res.json(res.enrollment);
});

// Delete Enrollment
router.delete("/enrollments/:id", getEnrollment, async (req, res) => {
  try {
    await res.enrollment.remove();
    res.json({ message: "Enrollment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single enrollment by ID
async function getEnrollment(req, res, next) {
  let enrollment;
  try {
    enrollment = await Enrollment.findById(req.params.id);
    if (enrollment == null) {
      return res.status(404).json({ message: "Enrollment not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.enrollment = enrollment;
  next();
}             */}

module.exports = router;
