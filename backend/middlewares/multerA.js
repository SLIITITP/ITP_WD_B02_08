const multer = require('multer');

/* const multer = require("multer");
//configure how the files are stored
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //where to store the file
    cb(null, 'uploads/answers');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});






//we can choose what kind of files can access
const fileFilter = (req, file, cb) => {
  //reject a file if it's not a jpg or png
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//add limits to uploading files
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = upload; */

//storage for notes files
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