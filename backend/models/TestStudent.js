const mongoose = require('mongoose');

 const TestStudent = new mongoose.Schema({
    studentId:{
        type:String,
        required : [true, "Please provide unique Student"],
        unique: [true, "StudentId Exist"]
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
    mobile : { type : Number},
    address: { type: String},
    profile: { type: String}
});

const testStudent = mongoose.model('TestStudent', TestStudent);
module.exports= testStudent;