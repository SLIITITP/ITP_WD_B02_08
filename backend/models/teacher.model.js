const mongoose = require('mongoose');

 const TeacherSchema = new mongoose.Schema({
    teacherId:{
        type:String,
        required : [true, "Please provide unique Teacher"],
        unique: [true, "TeacherId Exist"]
    },
    username : {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false,
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    firstName: { type: String},
    lastName: { type: String},
    teaId : { type : Number},
    address: { type: String},
    profile: { type: String}
});

const Teacher = mongoose.model('Teacher', TeacherSchema);
module.exports= Teacher;