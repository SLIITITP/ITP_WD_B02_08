
const express = require("express");

const { uploadAnswers } = require("../middlewares/multerA");

const { getItems, addItem , DownloadAssignments} = require("../controller/item");

const path = require('path');

const router = express.Router();

router.route('/addItems').post(uploadAnswers, addItem);

router.route('/getItems').get( getItems);

router.route('/getAll').get(DownloadAssignments);









module.exports = router;