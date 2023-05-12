
const Note = require('../models/notes');
const pdf = require('../models/pdf');
const Research = require('../models/research');
const Record = require('../models/records');
const path = require('path');
const fs = require('fs');




//NOTE MATERIALS CRUD FUNCTIONS AND OTHER FUNCTIONS

//adding the Note materials 
exports.note = (async (req,res)=>{ // exporting the note post method
    try {
      //checking the file and name is attached or not
       if (!req.file || !req.file.filename) {
        // If there is no file or filename sending the bad request
        return res.status(400).json({ error: 'Bad Request' });
        }
        //getting the title, description, category, grade, subject, teacher from the body
        const{title,description,grade,subject,teacher,secret} = req.body;
        //getting the file from the request
        const{filename,mimetype} = req.file;
        
        //creating the note model AND store it in the Notes variable
        const Notes = await Note.create({
            title : title,
            description: description,
           // category: category,
            grade: grade,
            subject: subject,
            teacher:teacher,
            secret:secret,
            file:filename,
            mimetype:mimetype
        });
        //sending the added Notes as a response 
        res.json(Notes);
        
    } catch (error) {// catching the errors
        console.log(error);
        res.status(500).send({msg:"error occurs of server"});// send the error msg
    }
});

//getting the all note materials
exports.getNotes = async (req, res) => {//exporting the get notes method
    try {
      //getting the notes from the database
      const notes = await Note.find();
      //checking the notes is available or not
      if (!notes) {
        // If no notes found, send custom error message
        return res.status(404).json({ msg: 'Notes not found' });
      }
      // If notes found, send the response
      res.json(notes);
    } catch (error) {//catching errors
      console.log(error);
      res.status(500).send({ msg: 'Error occurred..! try again shortly' });//send the error msg
    }
  };

  //getting the specific note by id
exports.viewNote = async (req, res) => {//exporting the getNote method
    try {
      //getting the id from the params
      const {id} = req.params;
      //find and get the notes 
      const notes = await Note.findById(id);
      //checking the notes is available or not
      if (!notes) {
        // If no notes found, send custom error message
        return res.status(404).json({ msg: 'Notes not found' });
      }
      //getting the file path
      //const filePath = path.join('D:\\study material management\\uploads\\notes', notes.file);
      // If notes found, send the response
      res.status(200).send(notes);
    } catch (error) {//catching the errors
      console.log(error);
      res.status(500).send({ msg: 'Error occurred..! try again shortly' });//send the error msg
    }
  };

  //update the Note Materials
exports.updateNote = async (req, res) => {//exporting the update PDF method
    try {
      //getting the id as a parameter
      const { id } = req.params;
      //getting the title, description, category, grade, subject, teacher from the body
      const { title, description, grade, subject, teacher } = req.body;
     
      //creating the updatedPdf variable
    const updatedNote =
        {
          title: title,
          description: description,
         // category: category,
          grade: grade,
          subject: subject,
          teacher: teacher,
        }
        //checking the file is attached or not
        if (req.file) {
          //getting the file from the req
            updatedPdf.file = req.file.filename;
            updatedPdf.mimetype = req.file.mimetype;
          }
          //finding the pdf using id and update the pdf
         const updated = await Note.findByIdAndUpdate(id,updatedNote);
          //checking the pdf is available or not
      if (!updated) {
        return res.status(404).json({ error: ' file not found' });//send the error msg
      }
      //send the updated pdf as a response
      res.json(updated);
      return({ msg: ' file updated' });//success msg
    
    } catch (error) {//catching the error
      console.error(error);
      res.status(500).json({ error: 'Server error' });//send the error msg
    }
  };
  
  //delete the Note Materials
  exports.deleteNote = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedNote = await Note.findByIdAndDelete(id);
      if (!deletedNote) {
        return res.status(404).json({ msg: 'Note not found' });
      }
      const filePath = path.resolve('uploads','notes',deletedNote.file);
      console.log('filePath:', filePath);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('unlink error:', err);
          return res.status(500).json({ msg: 'Failed to delete file' });
        }
        console.log(`File ${filePath} deleted successfully`);
      });
      res.json(deletedNote);
    } catch (error) {
      console.error('deleteNote error:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
  
//download the Note files
exports.DownloadNote = async (req, res) => {//exporting the download method
    try {
      //getting the id as a parameter
      const {id} = req.params;
      //finding the note using id
      const Notes = await Note.findById(id);
      //checking the Note is available or not
      if (!this.getNotes) {
        return res.status(404).json({ error: 'Note not found' });//send the error msg
      }
      //getting the file path
      const filePath = path.resolve('uploads','notes', Notes.file);
      //sending the file as response
      res.download(filePath);
    } catch (error) {//catching the errors
      console.log(error);
      res.status(500).send({ msg: 'Error occurred on server' });//send the error msg
    }
  };


  //PDF MATERIALS CRUD FUNCTIONS AND OTHER FUNCTIONS

 //adding the PDF materials
exports.pdf = (async (req,res)=>{// exporting the note post method
    try {
      //checking the file and name is attached or not
       if (!req.file || !req.file.filename) {
        // If there is no file or filename sending the bad request
        return res.status(400).json({ error: 'Bad Request' });
        }
        //getting the title, description, category, grade, subject, teacher from the body
        const{title,description,grade,subject,teacher,secret} = req.body;
        //getting the file from the request
        const{filename,mimetype} = req.file;

        //creating the PDF model AND store it in the PDF variable
        const PDF = await pdf.create({
            title : title,
            description: description,
            //category: category,
            grade: grade,
            subject: subject,
            teacher:teacher,
            secret:secret,
            file:filename,
            mimetype:mimetype
        });
        //sending the added PDF as a response
        res.json(PDF);
        
    } catch (error) {// catching the errors
        console.log(error);
        res.status(500).send({msg:"error occurs of server"});// send the error msg
    }
});

//getting the all PDF materials
exports.getPdf = async (req, res) => {//exporting the PDF post method
    try {
      //getting the pdf from the database
      const pdfFile = await pdf.find();
      //checking the pdf is available or not
      if (!pdfFile) {
        // If no notes found, send custom error message
        return res.status(404).json({ msg: 'Notes not found' });
      }
      // If notes found, send the response
      res.json(pdfFile);
    } catch (error) {//catching the errors
      console.log(error);
      res.status(500).send({ msg: 'Error occurred..! try again shortly' });//sending the error msg
    }
  };

//getting the specific pdf by id
exports.viewPdf = async (req, res) => {//exporting the getNote method
    try {
      //getting the id from the params
      const {id} = req.params;
      //find and get the pdf 
      const PDF = await pdf.findById(id);
      //checking the pdf is available or not
      if (!PDF) {
        // If no pdf found, send custom error message
        return res.status(404).json({ msg: 'Notes not found' });
      }
      //getting the file path
      //const filePath = path.join('D:\\study material management\\uploads\\pdf', PDF.file);
      // If pdf found, send the response
      res.status(200).send(PDF);
    } catch (error) {//catching the errors
      console.log(error);
      res.status(500).send({ msg: 'Error occurred..! try again shortly' });//send the error msg
    }
  };

//update the PDF Materials
exports.updatePdf = async (req, res) => {//exporting the update PDF method
    try {
      //getting the id as a parameter
      const { id } = req.params;
      //getting the title, description, category, grade, subject, teacher from the body
      const { title, description, grade, subject, teacher } = req.body;
     
      //creating the updatedPdf variable
    const updatedPdf =
        {
          title: title,
          description: description,
          //category: category,
          grade: grade,
          subject: subject,
          teacher: teacher,
        }
        //checking the file is attached or not
        if (req.file) {
          //getting the file from the req
            updatedPdf.file = req.file.filename;
            updatedPdf.mimetype = req.file.mimetype;
          }
          //finding the pdf using id and update the pdf
         const updated = await pdf.findByIdAndUpdate(id,updatedPdf);
          //checking the pdf is available or not
      if (!updated) {
        return res.status(404).json({ error: 'Pdf file not found' });//send the error msg
      }
      //send the updated pdf as a response
      res.json(updated);
      return({ msg: 'Pdf file updated' });//success msg
    
    } catch (error) {//catching the error
      console.error(error);
      res.status(500).json({ error: 'Server error' });//send the error msg
    }
  };

//delete the PDF Materials
exports.deletePdf = async (req, res) => {//exporting the delete PDF method
    try {
      //getting the id as a parameter
      const { id } = req.params;
      //finding the pdf using id and delete the pdf
      const deletedPdf = await pdf.findByIdAndDelete(id);
      //checking the pdf is available or not
      if (!deletedPdf) {
        return res.status(404).json({ msg: 'Pdf file not found' });//send the error msg
      }
         // Delete the associated file from the file system
    const filePath = path.resolve('uploads','pdf',deletedPdf.file);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Failed to delete file' });
      }
      console.log(`File ${filePath} deleted successfully`);
    });
      //send the deleted pdf as a response
      res.json(deletedPdf);
  
    } catch (error) {//catching the error
      console.error(error);
      res.status(500).json({ msg: 'Server error' });//send error msg
    }
  };
  
//download the PDF files
exports.DownloadPdf = async (req, res) => {//exporting the download PDF method 
    try {
      //getting the id as a parameter
      const {id} = req.params;
      //finding the pdf using id
      const Pdf = await pdf.findById(id);
      //checking the pdf is available or not
      if (!Pdf) {
        return res.status(404).json({ error: 'Pdf file not found' });// send the error msg
      }
      //getting the file path
      const filePath = path.resolve('uploads','pdf', Pdf.file);
      //sending the file as a response
      res.download(filePath);
    } catch (error) {//catching errors
      console.log(error);
      res.status(500).send({ msg: 'Error occurred on server' });// send the error msg
    }
  };


//RESEARCH MATERIALS CRUD FUNCTIONS AND OTHER FUNCTIONS

//adding the Research materials
exports.research = (async (req,res)=>{// exporting the research post method
    try {
      //checking the file and name is attached or not
       if (!req.file || !req.file.filename) {
        // If there is no file or filename sending the bad request
        return res.status(400).json({ error: 'Bad Request' });
        }
        //getting the title, description, category,teacher from the body
        const{title,description,teacher,secret} = req.body;
        //getting the file from the request
        const{filename,mimetype} = req.file;

        //creating the research model AND store it in the research variable
        const research = await Research.create({
            title : title,
            description: description,
           // category: category,
            teacher:teacher,
            secret:secret,
            file:filename,
            mimetype:mimetype
        });
        //sending the added research as a response
        res.json(research);
        
    } catch (error) {//catching the errors
        console.log(error);
        res.status(500).send({msg:"error occurs of server"});// send the error msg
    }
});

//getting all the Research Materials
exports.getResearches = async (req, res) => {//exporting the get method
    try {
      //finding all the researches
      const researches = await Research.find();
      //checking research file available or not
      if (!researches) {
        // If no notes found, send custom error message
        return res.status(404).json({ msg: 'Notes not found' });
      }
      //sending the researches as a response
      res.json(researches);
    } catch (error) {//catching error
      console.log(error);
      res.status(500).send({ msg: 'Error occurred..! try again shortly' });//send the error msg
    }
  };

//getting the specific Research by id
exports.viewResearch = async (req, res) => {//exporting the getNote method
    try {
      //getting the id from the params
      const {id} = req.params;
      //find and get the research 
      const research = await Research.findById(id);
      //checking the research is available or not
      if (!research) {
        // If no research found, send custom error message
        return res.status(404).json({ msg: 'Notes not found' });
      }
      //getting the file path
      //const filePath = path.join('D:\\study material management\\uploads\\research', research.file);
      // If research found, send the response
      res.status(200).send(research);
    } catch (error) {//catching the errors
      console.log(error);
      res.status(500).send({ msg: 'Error occurred..! try again shortly' });//send the error msg
    }
  };

//update the Research Materials
exports.updateResearch = async (req, res) => {//exporting the update method
    try {
      //getting the id as a parameter
      const { id } = req.params;
      //getting the title, description, category,teacher from the body
      const { title, description,teacher } = req.body;
     
      //creating the research model AND store it in the updatedResearch variable
    const updatedResearch =
        {
          title: title,
          description: description,
          teacher: teacher,
        }
        //checking the file is attached or not
        if (req.file) {
          //getting the file from the req
            updatedResearch.file = req.file.filename;
            updatedResearch.mimetype = req.file.mimetype;
          }
          //finding the research using id and update the research
         const updated = await Research.findByIdAndUpdate(id,updatedResearch);
          //checking the research file available or not
      if (!updated) {
        return res.status(404).json({ error: 'Research file not found' });//send the error msg
      }
      //sending the updated research as a response
      res.json(updated);
      return({ msg: 'Research file updated' });//success msg
    
    } catch (error) {//catching the errors
      console.error(error);
      res.status(500).json({ error: 'Server error' });//send the error msg
    }
  };

//delete the Research Materials
exports.deleteResearch = async (req, res) => {//exporting the delete method
    try {
      //getting the id as a parameter
      const { id } = req.params;
      //finding the research using id and delete the research
      const deletedResearch = await Research.findByIdAndDelete(id);
      //checking the research file available or not
      if (!deletedResearch) {
        return res.status(404).json({ msg: 'Research not found' });//send the error msg
      }
         // Delete the associated file from the file system
    const filePath = path.resolve('uploads','research', deletedResearch.file);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Failed to delete file' });
      }
      console.log(`File ${filePath} deleted successfully`);
    });
      //sending the deleted research as a response
      res.json(deletedResearch);
    } catch (error) {//catching the errors
      console.error(error);
      res.status(500).json({ msg: 'Server error' });//send the error msg
    }
  };

//download the Research files
exports.DownloadResearch = async (req, res) => {//exporting the download method
    try {
      //getting the id as a parameter
      const {id} = req.params;
      //finding the research using id
      const research = await Research.findById(id);
      //checking the research file available or not
      if (!research) {
        return res.status(404).json({ error: 'Research file not found' });//send the error msg
      }
      //getting the file path
      const filePath = path.resolve('uploads','research',research.file);
      //sending the file as a response
      res.download(filePath);
    } catch (error) {//catching the error
      console.log(error);
      res.status(500).send({ msg: 'Error occurred on server' });//send the error msg
    }
  };


  //RECORD MATERIALS CRUD FUNCTIONS AND OTHER FUNCTIONS

//adding the Record materials
exports.Record = async (req, res) => {
  try {
    // checking the file and name is attached or not
   // if (!req.file || !req.file.filename) {
      // If there is no file or filename sending the bad request
    //  return res.status(400).json({ error: 'Bad Request' });
   // }
    // getting the title, description, category, grade, subject, teacher, location from the body
    const { title, description, grade, subject, teacher,secret,fileLink} = req.body;
    // getting the file from the request
   // const { filename, mimetype } = req.file;

    // creating the record model AND store it in the record variable
    const record = await Record.create({
      
      title: title,
      description: description,
      //category: category,
      grade: grade,
      subject: subject,
      teacher: teacher,
      secret:secret,
      fileLink:fileLink,
     // file: filename,
     // mimetype: mimetype
    });
    await record.validate();
    // sending the added record as a response
    res.json(record);

  } catch (error) {//catching the errors
    console.log(error);
    res.status(500).send({ msg: "error occurs of server " });//send the error msg
  }
};

  


//get all the Record Materials
exports.getRecords = async (req, res) => {//exporting the get method
    try {
      //finding all the records
      const records = await Record.find();
      //checking the records available or not
      if (!records) {
        // If no notes found, send custom error message
        return res.status(404).json({ msg: 'Notes not found' });
      }
      //sending the records as a response
      res.json(records);
    } catch (error) {//catching the errors 
      console.log(error);
      res.status(500).send({ msg: 'Error occurred..! try again shortly' });//send the error msg
    }
  };
  
//getting the specific Record by id
exports.viewRecord = async (req, res) => {//exporting the get method
    try {
      //getting the subject and grade from the query
      const {id} = req.params;
      //finding the record using subject and grade
      const records = await Record.findById(id);
      //checking the records available or not
      if (!records) {
        // If no notes found, send custom error message
        return res.status(404).json({ msg: 'Notes not found' });
      }
  
      //sending the records as a response
      res.json(records);
    } catch (error) {//catching the errors
      console.log(error);
      res.status(500).send({ msg: 'Error occurred..! try again shortly' });//send the error msg
    }
  };

//update the Record Materials
exports.updateRecord = async (req, res) => {//exporting the update method
    try {
      //getting the id as a parameter
      const { id } = req.params;
      //getting the title, description, category, grade, subject, teacher from the body
      const { title, description, grade, subject, teacher,fileLink } = req.body;
     
      //creating the updatedRecord object
    const updatedRecord =
        {
          title: title,
          description: description,
         // category: category,
          grade: grade,
          subject: subject,
          teacher: teacher,
          fileLink:fileLink
        }
        //checking the file is attached or not
       /*  if (req.file) {
          //getting the file from the req
            updatedRecord.file = req.file.filename;
            updatedRecord.mimetype = req.file.mimetype;
          } */
          //finding the record using id and update the record
         const updated = await Record.findByIdAndUpdate(id,updatedRecord);
          //checking the record available or not
      if (!updated) {
        return res.status(404).json({ error: 'Recording not found' });//send the error msg
      }
      //sending the updated record as a response
      res.json(updated);
      return({ msg: 'Recording files updated' });
    
    } catch (error) {//catching the errors
      console.error(error);
      res.status(500).json({ error: 'Server error' });//send the error msg
    }
  };

//delete the Record Materials
exports.deleteRecord = async (req, res) => {//exporting the delete function 
    try {
      //getting the id as a parameter
      const { id } = req.params;
      //finding the record using id and delete the record
      const deletedRecord = await Record.findByIdAndDelete(id);
  
      //checking the record available or not
      if (!deletedRecord) {
        return res.status(404).json({ msg: 'Recording not found' });//send the error msg
      }
      //sending the deleted record as a response
      res.json(deletedRecord);
    } catch (error) {//catching the errors
      console.error(error);
      res.status(500).json({ msg: 'Server error' });//send the error msg
    }
  };
  