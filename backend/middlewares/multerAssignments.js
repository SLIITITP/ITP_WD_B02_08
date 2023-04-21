const multer = require('multer');

const AssignmentStorage = multer.diskStorage({
  destination: function (req, file, cb) {

      cb(null,'uploads/Assignments');
  },
  filename: ((req,file,cb)=>{

      cb(null, Date.now() + '-'+ file.originalname);
  })

});


const fileFilterAssignments = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png' ,'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Cannot accept this file type. Please upload either a JPEG or PNG image or pdf'), false);
  }
};

const uploadAssignments = multer({ storage: AssignmentStorage, fileFilter:fileFilterAssignments }).single('file');

module.exports = {uploadAssignments};