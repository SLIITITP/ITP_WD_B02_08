const multer = require('multer');

const AnswerStorage = multer.diskStorage({
  destination: function (req, file, cb) {

      cb(null,'uploads/answers');
  },
  filename: ((req,file,cb)=>{

      cb(null, Date.now() + '-'+ file.originalname);
  })

});


const fileFilterAnswers = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png' ,'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Cannot accept this file type. Please upload either a JPEG or PNG image or pdf'), false);
  }
};

const uploadAnswers = multer({ storage: AnswerStorage, fileFilter:fileFilterAnswers }).single('file');

module.exports = {uploadAnswers};