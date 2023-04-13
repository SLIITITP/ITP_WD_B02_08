const mongoose = require('mongoose');


const researchSchema = new mongoose.Schema({


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


// Export research schema
module.exports = mongoose.model('research', researchSchema);