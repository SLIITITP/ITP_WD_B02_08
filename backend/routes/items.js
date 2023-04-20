
const express = require("express");

const { uploadAnswers } = require("../middlewares/multerA");

const { getItems, addItem} = require("../controller/item");

const { createReadStream } = require('fs');
const archiver = require('archiver');
const path = require('path');

const router = express.Router();

router.route('/addItems').post(uploadAnswers, addItem);

router.route('/getItems').get( getItems);


// Endpoint for getting all items
router.get('/getAllItems', async (req, res) => {
    try {
      const items = await items.find();
      const archive = archiver('zip');
      archive.on('error', (err) => {
        throw err;
      });
      archive.pipe(res);
      items.forEach((item) => {
        const fileStream = createReadStream(path.join(__dirname, '..', item.file));
        archive.append(fileStream, { name: item.name });
      });
      archive.finalize();
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  });







module.exports = router;