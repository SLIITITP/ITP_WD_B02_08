/* import React, { useState } from 'react';
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
      <label htmlFor="subject">Subject:</label>
      <input type="text" className="form-control" id="subject" name="subject" value={assignment.subject} onChange={handleInputChange} />
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
      <label htmlFor="file">File</label>
      <input type="file" className="form-control-file" id="file" name="file" onChange={handleFileChange} />
    </div>

    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  );
}

export default AssignmentForm;
 */

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
    }
  };

  //form validations
  const validate = (assignment) => {
    const errors = {};
    if (!assignment.type) {
      errors.type = 'Assignment type is required';
    }
    if (!assignment.subject) {
      errors.subject = 'Subject is required';
    }
    if (!assignment.grade) {
      errors.grade = 'Grade is required';
    }
    if (!assignment.guidelines) {
      errors.guidelines = 'Guidelines are required';
    }
    if (!assignment.deadline) {
      errors.deadline = 'Deadline is required';
    }
    return errors;
  };

  return (

   
    <form onSubmit={handleSubmit} className="container">
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
    <label htmlFor="guidelines">Guidelines:</label>
    <textarea className="form-control" id="guidelines" name="guidelines" value={assignment.guidelines} onChange={handleInputChange} />
    {errors.guidelines && <div className="text-danger">{errors.guidelines}</div>}
  </div>

  <div className="form-group">
    <label htmlFor="deadline">Deadline:</label>
    <input type="date" className="form-control" id="deadline" name="deadline" value={assignment.deadline} onChange={handleInputChange} />
    {errors.deadline && <div className="text-danger">{errors.deadline}</div>}
  </div>

  <div className="form-group">
    <label htmlFor="file">File</label>
    <input type="file" className="form-control-file" id="file" name="file" onChange={handleFileChange} />
  </div>

  <button  className="btn btn-primary">
                     Create
                    </button>
</form>

  );
}

export default AssignmentForm;
