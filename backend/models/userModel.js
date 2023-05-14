// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: true,
//     },
//     email:{
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password:{
//         type: String,
//         required: true,
//     },
//     isAdmin:{
//         type: Boolean,
//         required: true,
//         default: false,
//     }
// },{
//     timestamps:true,
// });

// const userModel = mongoose.model("users" , userSchema);
// module.exports = userModel;




const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userID: {
        type: String,
        unique: true,
        //required: true,
    },
    username:{
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
    grade:{
        type: String,
        required: false,
    },
    isAdmin:{
        type: Boolean,
        required: false,
        default: false,
    }
},{
    timestamps:true,
});

// Generate custom userID
userSchema.pre('save', function (next) {
    const user = this;
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const prefix = user.isAdmin ? 'ADM' : 'STD';
    user.userID = `${prefix}${currentYear}${Math.floor(Math.random() * 900) + 100}`;
    next();
});

const userModel = mongoose.model("users" , userSchema);
module.exports = userModel;
