const multer = require('multer');

//storage for notes files
const noteStorage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null,'uploads/notes');
    },
    filename: ((req,file,cb)=>{

        cb(null, Date.now() + '-'+ file.originalname);
    })

});

//storage for pdf files
const pdfStorage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null,'uploads/pdf');
    },
    filename: ((req,file,cb)=>{

        cb(null, Date.now() + '-'+ file.originalname);
    })

});


//storage for record files banner
const recordStorage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null,'uploads/records');
    },
    filename: ((req,file,cb)=>{

        cb(null, Date.now() + '-'+ file.originalname);
    })

});


//storage for research files
const researchStorage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null,'uploads/research');
    },
    filename: ((req,file,cb)=>{

        cb(null, Date.now() + '-'+ file.originalname);
    })

});

//validations
const fileFilterNote = (req, file, cb) => {
    if(file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'|| file.mimetype === 'text/plain' || file.mimetype === 'vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Cannot Accept this file type...., Please Input [docx,txt,xlsx] format'), false);
    }
  }

const fileFilterPdf= (req, file, cb) => {
    if(file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Cannot Accept this file type...., Please Input [pdf] format'), false);
    }
  }

  const fileFilterRecord = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Cannot accept this file type. Please upload either a JPEG or PNG image.'), false);
    }
  };


  const uploadNotes = multer({ storage:noteStorage, fileFilter: fileFilterNote }).single('file');
  const uploadPdf = multer({ storage:pdfStorage, fileFilter:fileFilterPdf }).single('file');
  const uploadVideo = multer({ storage:recordStorage, fileFilter:fileFilterRecord}).single('file');
  const uploadResearchFile = multer({storage:researchStorage, fileFilter:fileFilterPdf}).single('file');
  
  module.exports = {uploadNotes,uploadPdf,uploadVideo,uploadResearchFile};