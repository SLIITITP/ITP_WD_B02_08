import React, { useState } from 'react';
import axios from 'axios';
import '../../stylesheets/form.css'

const AssignmentForm = () => {
  const [assignment, setAssignment] = useState({
    type: '',
    grade: '',
    guidelines: '',
    deadline: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAssignment({
      ...assignment,
      [name]: value
    });
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/assignments/add', assignment);
      alert('Assignment added successfully!');
      // You can add additional logic here, such as showing a success message or redirecting to another page
    } catch (error) {
      console.error('Error adding assignment:', error);
      // You can handle the error here, such as showing an error message
    }
  }

  return (
    <div className="assignment-form-container">
      <h1>Create new Assignment</h1>
      <form className="assignment-form">
        <div className='form-group'>
          <label>Assignment Type</label>
          <select name="type" id="type" className="form-control" value={assignment.type} onChange={handleInputChange}>
            <option value="">Select Assignment Type</option>
            <option value="Home Work">Home Work</option>
            <option value="Group Work">Group Work</option>
            <option value="Subject Related">Subject Related</option>
            <option value="Extra Work">Extra Work</option>
          </select>
        </div>

        <div className='form-group'>
          <label>Grade</label>
          <select name="grade" id="grade" className="form-control" value={assignment.grade} onChange={handleInputChange}>
            <option value="">Select grade</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
          </select>
        </div>

        <div className='form-group'>
          <label>Assignment Guidelines</label>
          <input type="text" className="form-control" placeholder="Enter Name" name="guidelines" id="gui" value={assignment.guidelines} onChange={handleInputChange} />
        </div>

        <div className='form-group'>
          <label>Deadline</label>
          <input type="date" className="form-control" placeholder="Enter deadline" id="deadline" name="deadline" value={assignment.deadline} onChange={handleInputChange} />
        </div>

        <button type="button" className="btn btn-success" onClick={onSubmit} >Create Assignment</button>
      </form>
    </div>
  );
}

export default AssignmentForm;
