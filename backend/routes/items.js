
const express = require("express");



const { uploadAnswers } = require("../middlewares/multerA");



const { getItems, addItem, downloadFile } = require("../controller/item");

const router = express.Router();

router.route('/getItems').post(uploadAnswers, addItem);

router.route("/download/:id").get(downloadFile);

module.exports = router;