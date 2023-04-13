const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({


    Name:{
        type:String,
        required:true,
    },
    materialTitle: {
        type: String,
        required: true,
      },
    feedback:{ 
        type: String,
        required: true
    },
    replies: [
        {
          teacherName: {
            type: String,
            required: true,
          },
          reply: {
            type: String,
            required: true,
          },
         
        },
      ],
      
    },
    {timestamps: true}
  
    );
    


// Export  schema
module.exports = mongoose.model('feedback',feedbackSchema);