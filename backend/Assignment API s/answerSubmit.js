const express = require('express');
const multer = require('multer');
const pdfkit = require('pdfkit');
const fs = require('fs');

const app = express();

// Set up multer storage and upload middleware

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Set up API endpoint for file upload
app.post('/uploads', upload.single('file'), (req, res) => {
  const { filename } = req.file;
  const fileUrl = `./uploads/${filename}`;

  // Generate PDF from uploaded file
  const pdf = new pdfkit();
  pdf.pipe(fs.createWriteStream(`./uploads/${filename}.pdf`));
  pdf.image(fileUrl);
  pdf.end();

  // Send PDF file as response
  res.sendFile(`${filename}.pdf`, { root: './uploads' });
});

