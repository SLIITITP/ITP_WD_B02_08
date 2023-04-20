const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AmNipSchema = new Schema({
  date: {type: Date, required: true},
  time: {type: String, required: true},
  subject: {type: Schema.Types.ObjectId, ref: 'Subject', required: true},
  student: {type: Schema.Types.ObjectId, ref: 'NipunUser', required: true}
});

const AmNip = mongoose.model('AmNip', AmNipSchema);

module.exports = AmNip;
