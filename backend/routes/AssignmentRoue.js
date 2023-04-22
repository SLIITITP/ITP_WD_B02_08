
const express = require("express");

const {uploadAssignments } = require("../middlewares/multerAssignments");

const { getAssignments, getAssignmentById, addAssignments , updateAssignment,   deleteAssignment,Download} = require("../controller/AssignmentController");

const path = require('path');

const router = express.Router();

//add
router.route('/addAssignments').post(uploadAssignments, addAssignments);

//getall
router.route('/getAssignments').get( getAssignments);

//get by id
router.route('/getAssignments/:id').get(getAssignmentById);

//update
router.route('/updateAssignments/:id').put(updateAssignment);

//delete
router.route('/deleteAssignments/:id').delete(deleteAssignment);

//route for download item
router.route('/DownloadAss/:id').get(Download);


module.exports = router;