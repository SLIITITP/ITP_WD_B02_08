const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, "Please provide unique Student"],
    unique: [true, "StudentId Exist"],
  },
  username: {
    type: String,
    required: [true, "Please provide unique Username"],
    unique: [true, "Username Exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true,
  },
  isAdmin:{
    type: Boolean,
    required: false,
    default: false,
},
  grade: { type: String, required: [true, "Please provide Grade"] },
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: Number },
  address: { type: String },
  profile: { type: String },
});

const Student = mongoose.model("Student", UserSchema);
module.exports = Student;
