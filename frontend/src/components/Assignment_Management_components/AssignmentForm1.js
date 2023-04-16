import React, { useState } from 'react';
import axios from 'axios';

const AssignmentForm1 = () => {
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
   



    <div className='container'>
    <h2>Edit Assignment</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
      <label>Assignment Type</label>
          <select name="type" id="type" className="form-control" value={assignment.type} onChange={handleInputChange}>
            <option value="">Select Assignment Type</option>
            <option value="Home Work">Home Work</option>
            <option value="Group Work">Group Work</option>
            <option value="Subject Related">Subject Related</option>
            <option value="Extra Work">Extra Work</option>
          </select>
      </div>
      <div className="form-group">
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
      <div className="form-group">
        <label htmlFor="guidelines">Guidelines:</label>
        <textarea className="form-control" id="guidelines" name="guidelines" value={assignment.guidelines} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label htmlFor="deadline">Deadline:</label>
        <input type="date" className="form-control" id="deadline" name="deadline" value={assignment.deadline} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image:</label>
        <input type="file" className="form-control" id="image" name="image" onChange={handleFileChange} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>


  );
}

export default AssignmentForm1;