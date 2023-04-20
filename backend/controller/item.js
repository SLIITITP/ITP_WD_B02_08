const Item = require("../models/item");
const path = require("path");
const asyncWrapper = require("../middlewares/asyncWrapper");

const fs = require('fs');
const archiver = require('archiver');


const downloadAllFiles = async (req, res) => {
  try {
    const items = await Item.find();
    const zipFileName = `all-files-${new Date().getTime()}.zip`;

    const archive = archiver('zip', { zlib: { level: 9 } });
    const output = fs.createWriteStream(zipFileName);
    archive.pipe(output);

    items.forEach((item) => {
      const filePath = path.join(__dirname, '..', item.file);
      archive.file(filePath, { name: item.name });
    });

    archive.finalize();
    output.on('close', () => {
      res.download(zipFileName);
      fs.unlinkSync(zipFileName);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
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
  downloadAllFiles
  
};
