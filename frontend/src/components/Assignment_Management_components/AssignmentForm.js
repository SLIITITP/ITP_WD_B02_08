
import React, { useState } from 'react';
import axios from 'axios';

function AssignmentForm({ onSubmit }) {
  const [assignment, setAssignment] = useState({
    TeacherID: '',
    type: '',
    subject: '',
    grade: '',
    deadline: '',
    file: null,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAssignment({ ...assignment, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAssignment({ ...assignment, file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    const errors = validate(assignment);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      formData.append('TeacherID', assignment.TeacherID);
      formData.append('type', assignment.type);
      formData.append('subject', assignment.subject);
      formData.append('grade', assignment.grade);
      formData.append('deadline', assignment.deadline);
      formData.append('file', assignment.file);
      try {
        const response = await axios.post('http://localhost:9090/as/addAssignments', formData);
        onSubmit(response.data.assignment);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //form validations
  const validate = (assignment) => {
    const errors = {};

    if (!assignment.TeacherID) {
      errors.TeacherID= 'TeacherID is required';
    } 
    if (!assignment.type) {
      errors.type = 'Assignment type is required';
    }
    if (!assignment.subject) {
      errors.subject = 'Subject is required';
    }
    if (!assignment.grade) {
      errors.grade = 'Grade is required';
    }
   
    if (!assignment.deadline) {
      errors.deadline = 'Deadline is required';
    }
    return errors;
  };

  return (


    <form onSubmit={handleSubmit} className="container">


<div className="form-group">
        <label htmlFor="id">TeacherID:</label>
        <input type="text" className="form-control" id="TeacherID" name="TeacherID" value={assignment.TeacherID} onChange={handleInputChange} />
        {errors.TeacherID && <div className="text-danger">{errors.TeacherID}</div>}
      </div>

      <div className="form-group">
        <label>Assignment Type</label>
        <select name="type" id="type" className="form-control" value={assignment.type} onChange={handleInputChange} required>
          <option value="">Select Assignment Type</option>
          <option value="Home Work">Home Work</option>
          <option value="Group Work">Group Work</option>
          <option value="Subject Related">Subject Related</option>
          <option value="Extra Work">Extra Work</option>
        </select>
        {errors.type && <div className="text-danger">{errors.type}</div>}
      </div>
      <div className="form-group">
        <label>Grade</label>
        <select name="grade" id="grade" className="form-control" value={assignment.grade} onChange={handleInputChange} required>
          <option value="">Select grade</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
        </select>
        {errors.grade && <div className="text-danger">{errors.grade}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="subject">Subject:</label>
        <input type="text" className="form-control" id="subject" name="subject" value={assignment.subject} onChange={handleInputChange} />
        {errors.subject && <div className="text-danger">{errors.subject}</div>}
      </div>

      

      <div className="form-group">
        <label htmlFor="deadline">Deadline:</label>
        <input type="date" className="form-control" id="deadline" name="deadline" value={assignment.deadline} onChange={handleInputChange} />
        {errors.deadline && <div className="text-danger">{errors.deadline}</div>}
      </div>

      <div className="form-group">
        
        <input type="file" onChange={handleFileChange}  style={{ marginTop: '10px' }}className="!block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" />
      </div>





      <button className="btn btn-primary" style={{ marginTop: '10px' }}>
        Create
      </button>
    </form>

  );
}

export default AssignmentForm;
