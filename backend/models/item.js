// Import required modules
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({

    name:{
        type:String,
        required: [true,"Please provide a name"],
        trim:true,
        maxlength:[20,"Name cannot be more than 20 characters"]
    },
    TeaID:{
        type:String,
        required:true
    },
    grade:{
        type:Number,
        required: true,
    },
    assignmentType:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true,
    },

    file:{

        type:String,
        required:[true,"Please provide a file"],

    },

})

module.exports = mongoose.model("Item",itemSchema)
