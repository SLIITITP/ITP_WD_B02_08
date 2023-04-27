const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userID: {
        type: String,
        unique: true,
        //required: true,
    },
    name:{
        type: String,
        required: false,
    },
    email:{
        type: String,
        required: false,
        unique: true,
    },
    password:{
        type: String,
        required: false,
    },
    isAdmin:{
        type: Boolean,
        required: false,
        default: true,
    }
},{
    timestamps:true,
});

// Generate custom userID
userSchema.pre('save', function (next) {
    const user = this;
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const prefix = user.isAdmin ? 'TCH' : 'STD';
    user.userID = `${prefix}${currentYear}${Math.floor(Math.random() * 900) + 100}`;
    next();
});

const teachersModel = mongoose.model("admins" , userSchema);
module.exports = teachersModel;
