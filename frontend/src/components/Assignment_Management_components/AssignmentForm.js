import React, { useState } from 'react';
import axios from 'axios';

const AssignmentForm = () => {
  const [assignment, setAssignment] = useState({
    type: '',
    grade: '',
    guidelines: '',
    deadline: '',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignment(prevAssignment => ({
      ...prevAssignment,
      [name]: value
    }));
  }

  const handleFileChange = (e) => {
    setAssignment(prevAssignment => ({
      ...prevAssignment,
      image: e.target.files[0]
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('type', assignment.type);
    formData.append('grade', assignment.grade);
    formData.append('guidelines', assignment.guidelines);
    formData.append('deadline', assignment.deadline);
    formData.append('testimage', assignment.image);
    axios.post('http://localhost:9090/upload', formData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <input type="text" name="type" value={assignment.type} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Grade:
          <input type="text" name="grade" value={assignment.grade} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Guidelines:
          <input type="text" name="guidelines" value={assignment.guidelines} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Deadline:
          <input type="text" name="deadline" value={assignment.deadline} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Upload Image:
          <input type="file" onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AssignmentForm;