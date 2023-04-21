import React, { useState } from 'react';
import axios from 'axios';

function AssignmentForm({ onSubmit }) {
  const [assignment, setAssignment] = useState({
    type: '',
    subject: '',
    grade: '',
    guidelines: '',
    deadline: '',
    file: null,
  });

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
    const formData = new FormData();
    formData.append('type', assignment.type);
    formData.append('subject', assignment.subject);
    formData.append('grade', assignment.grade);
    formData.append('guidelines', assignment.guidelines);
    formData.append('deadline', assignment.deadline);
    formData.append('file', assignment.file);
    try {
      const response = await axios.post('http://localhost:9090/as/addAssignments', formData);
      onSubmit(response.data.assignment);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Type:
        <input type="text" name="type" value={assignment.type} onChange={handleInputChange} />
      </label>
      <label>
        Subject:
        <input type="text" name="subject" value={assignment.subject} onChange={handleInputChange} />
      </label>
      <label>
        Grade:
        <input type="text" name="grade" value={assignment.grade} onChange={handleInputChange} />
      </label>
      <label>
        Guidelines:
        <input type="text" name="guidelines" value={assignment.guidelines} onChange={handleInputChange} />
      </label>
      <label>
        Deadline:
        <input type="text" name="deadline" value={assignment.deadline} onChange={handleInputChange} />
      </label>
      <label>
        File:
        <input type="file" name="file" onChange={handleFileChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AssignmentForm;
