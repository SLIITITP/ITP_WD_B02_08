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
    type: [Number],
    required: true
  }
});

nipunUserSchema.pre('save', function(next) {
  const now = new Date();
  const year = now.getFullYear().toString().substr(-2);
  const stdPrefix = 'STD';
  const zeroPadding = '00000';
  const sequenceNum = this.isNew ? 1 : parseInt(this.studentID.slice(-3), 10) + 1;
  const sequenceCode = sequenceNum.toString().padStart(3, '0');
  const idWithoutSeq = stdPrefix + year + zeroPadding.substring(0, 5 - this._id.toString().length - stdPrefix.length - year.length) + this._id.toString();
  this.studentID = idWithoutSeq + sequenceCode;
  next();
});



module.exports = mongoose.model('NipunUser', nipunUserSchema);
