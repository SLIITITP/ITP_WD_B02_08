const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    grade : {
        type : String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    hall: {
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    fees:{
        type: Number,
        required: true
    }

})

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
