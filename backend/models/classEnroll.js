const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  classID:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: false,
  } ],
});


const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollment;
