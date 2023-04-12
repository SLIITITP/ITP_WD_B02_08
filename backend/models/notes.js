const mongoose = require ('mongoose');

const noteSchema = new mongoose.Schema({


    title:{
        type:String,
        required:true,
    },

    description:{ 
        type: String,
        required: true
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
        required:true
    },

},
{timestamps: true}
  
);

// Export Notes schema
module.exports = mongoose.model('notes', noteSchema);