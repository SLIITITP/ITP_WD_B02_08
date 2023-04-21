const Assignment = require("../models/AssignmentModel");
const path = require("path");
const asyncWrapper = require("../middlewares/asyncWrapper");




const addAssignments = asyncWrapper(async (req, res) => {
  const { type } = req.body;
  const { subject } = req.body;
  const { grade } = req.body;
  const { guidelines} = req.body;
  const { deadline} = req.body;
  const file = req.file.path;
  const assignment = await Assignment.create({ type,subject,grade,guidelines,deadline, file });
  res.status(201).json({ assignment });
});





const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json({assignments });
  } catch (error) {
    console.log(error);
  }
};


const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.status(200).json({ assignment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error occurred on server' });
  }
};


const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    const { type, subject, grade, guidelines, deadline } = req.body;
    assignment.type = type || assignment.type;
    assignment.subject = subject || assignment.subject;
    assignment.grade = grade || assignment.grade;
    assignment.guidelines = guidelines || assignment.guidelines;
    assignment.deadline = deadline || assignment.deadline;
    await assignment.save();
    res.status(200).json({ message: 'Assignment updated successfully', assignment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error occurred on server' });
  }
};




const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    await assignment.remove();
    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error occurred on server' });
  }
};






const Download = async (req, res) => {
  try {
    const { id } = req.params;
    // finding the item using the id
    const assignment = await Assignment.findById(id);
    // checking if the item exists
    if (!assignment) {
      return res.status(404).json({ error: 'Item not found' });
    }
    // getting the file path
      // const filePath = path.join('D:\\ITP\\backend\\uploads\\answers', item.file);
      
    const filePath = path.resolve( 'uploads', 'Assignments', assignment.file);
    // sending the file as response
    res.download(assignment.file);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: 'Error occurred on server' });
  }
};


module.exports = {
  getAssignments,
  addAssignments,
  Download,
  deleteAssignment,
  updateAssignment,
  getAssignmentById
};
