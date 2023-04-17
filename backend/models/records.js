const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema(
{
  
  title:{
    type:String,
    required:true,
},

description:{ 
    type: String,
    required:true
},
category:{
    type: String,
    required:true
},


grade:{
    type:String,
    required:true
},

subject:{
    type:String,
    required:true
},

teacher:{
    type: String,
    required:true
  },

file:{
    type:String,
    required:false
},
},

{timestamps: true}
);
//export the record schema
  module.exports = mongoose.model('record', recordSchema);