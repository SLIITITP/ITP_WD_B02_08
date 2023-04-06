const mongoose = require('mongoose');

const euserModelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false,
    }
},{
    timestamps:true,
});

const EuserModel = mongoose.model('users', euserModelSchema)

module.exports = EuserModel