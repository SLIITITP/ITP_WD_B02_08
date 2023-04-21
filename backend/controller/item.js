const Item = require("../models/item");
const path = require("path");
const asyncWrapper = require("../middlewares/asyncWrapper");
const item = require("../models/item");

const DownloadAssignments = async (req, res) => {
  try {
    const { id } = req.params;
    // finding the item using the id
    const item = await Item.findById(id);
    // checking if the item exists
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    // getting the file path
      // const filePath = path.join('D:\\ITP\\backend\\uploads\\answers', item.file);
      
    const filePath = path.resolve( 'uploads', 'answers', item.file);
    // sending the file as response
    res.download(item.file);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: 'Error occurred on server' });
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
