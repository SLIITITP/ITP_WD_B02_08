const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    required: false
  },
  grades: {
    type: [String],
    required: false
  },
  whatsappNumber: {
      type: String,
      required: false
  },
  phoneNumber: {
      type: String,
      required: false
  },
  address: {
      type: String,
      required: false
  },
  password: {
      type: String,
      required: false
  }
});

// nipunUserSchema.pre('save', async function (next) {
//   const now = new Date();
//   const year = now.getFullYear().toString().substr(-2);
//   const stdPrefix = 'STD';
//   let grade;
//   const lastGrade = this.grades[this.grades.length - 1];
//   if (lastGrade === "Other") {
//     grade = 0;
//   } else {
//     grade = lastGrade;
//   }
//   let sequenceNum = 1;
//   let idWithoutSeq = '';
//   let isUnique = false;

//   while (!isUnique) {
//     const sequenceCode = sequenceNum.toString().padStart(4, '0');
//     idWithoutSeq = stdPrefix + year + grade.toString() + sequenceCode;

//     // check if the generated student ID already exists in the database
//     const existingStudent = await mongoose.model('NipunUser', nipunUserSchema).findOne({ studentID: idWithoutSeq }).exec();
//     if (!existingStudent) {
//       isUnique = true;
//     } else {
//       sequenceNum++;
//     }
//   }

//   // generate random password
//   if (!this.password) {
//     const password = Math.random().toString(30).substring(2, 8);
//     //const hashedPassword = await bcrypt.hash(password, 10);
//     this.password = password;
//   }

//   this.studentID = idWithoutSeq;
//   next();
// });

module.exports = mongoose.model('NipunUser', nipunUserSchema);
