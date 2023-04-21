const Item = require("../models/item");
const path = require("path");
const asyncWrapper = require("../middlewares/asyncWrapper");
const item = require("../models/item");


//download 
const DownloadAssignments = async (req, res) => {//exporting the download method
    try {
     
      //finding the note using id
      const item = await Item.find()
      //checking the Note is available or not
      if (!this.item) {
        return res.status(404).json({ error: 'Note not found' });//send the error msg
      } 
      //getting the file path
      const filePath = path.resolve('uploads','answers',Item.file);
      //sending the file as response
      res.download(filePath);
    } catch (error) {//catching the errors
      console.log(error);
      res.status(500).send({ msg: 'Error occurred on server' });//send the error msg
    }
  };






const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({ items });
  } catch (error) {
    console.log(error);
  }
};



const addItem = asyncWrapper(async (req, res) => {
  const { name } = req.body;
  const file = req.file.path;
  const item = await Item.create({ name, file });
  res.status(201).json({ item });
});





module.exports = {
  getItems,
  addItem,
  DownloadAssignments
  
};
