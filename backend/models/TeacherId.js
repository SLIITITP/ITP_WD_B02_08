const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherIdSchema = new Schema({
    teacherId : {
        type : String,
        required: true
    },
})

const TeacherIds = mongoose.model("teacherIds", teacherIdSchema);
module.exports = TeacherIds;