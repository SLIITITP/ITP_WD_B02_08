const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const amNipSchema = new Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    teacher: { type: Schema.Types.String, ref: 'Subject', required: true },
    student: { type: Schema.Types.ObjectId, ref: 'NipunUser', required: true },
    studentID: { type: Schema.Types.String, ref: 'NipunUser', required: true },
    grade: { type: String, required: true }
});

const AmNip = mongoose.model('AmNip', amNipSchema);

module.exports = AmNip;