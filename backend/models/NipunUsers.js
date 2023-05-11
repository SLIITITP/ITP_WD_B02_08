const mongoose = require('mongoose');

const nipunUserSchema = new mongoose.Schema({
  studentID: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  grades: {
    type: [String],
    required: true
  }
});

nipunUserSchema.pre('save', async function (next) {
  const now = new Date();
  const year = now.getFullYear().toString().substr(-2);
  const stdPrefix = 'STD';
  let grade;
  const lastGrade = this.grades[this.grades.length - 1];
  if (lastGrade === "Other") {
    grade = 0;
  } else {
    grade = lastGrade;
  }
  let sequenceNum = 1;
  let idWithoutSeq = '';
  let isUnique = false;

  while (!isUnique) {
    const sequenceCode = sequenceNum.toString().padStart(4, '0');
    idWithoutSeq = stdPrefix + year + grade.toString() + sequenceCode;

    // check if the generated student ID already exists in the database
    const existingStudent = await mongoose.model('NipunUser', nipunUserSchema).findOne({ studentID: idWithoutSeq }).exec();
    if (!existingStudent) {
      isUnique = true;
    } else {
      sequenceNum++;
    }
  }

  this.studentID = idWithoutSeq;
  next();
});

module.exports = mongoose.model('NipunUser', nipunUserSchema);