
import React, { useState } from 'react';
import axios from 'axios';

function AssignmentForm({ onSubmit }) {
  // State initialization using useState hook
  const [assignment, setAssignment] = useState({
    TeacherID: '',
    type: '',
    subject: '',
    grade: '',
    deadline: '',
    file: null,
  });

  const [errors, setErrors] = useState({});

  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State for success alert

  // Event handler for input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAssignment({ ...assignment, [name]: value });
  };

  // Event handler for file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAssignment({ ...assignment, file });
  };

  // Event handler for form submission
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
        setShowSuccessAlert(true); // Show success alert

      } catch (error) {
        console.log(error);
      }
    }
  };

  //form validations
  const validate = (assignment) => {
    const errors = {};

    if (!assignment.TeacherID) {
      errors.TeacherID = 'TeacherID is required';
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

  // Form rendering
  return (
    <form onSubmit={handleSubmit} className="container mx-auto max-w-md">
      <div className="mb-4">
        <label htmlFor="TeacherID" className="block text-sm font-medium text-gray-700">
          TeacherID:
        </label>
        <input
          type="text"
          className={`form-control ${errors.TeacherID ? 'border-red-500' : ''}`}
          id="TeacherID"
          name="TeacherID"
          value={assignment.TeacherID}
          onChange={handleInputChange}
        />
        {errors.TeacherID && <div className="text-red-500">{errors.TeacherID}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Assignment Type:
        </label>
        <select
          name="type"
          id="type"
          className={`form-control ${errors.type ? 'border-red-500' : ''}`}
          value={assignment.type}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Assignment Type</option>
          <option value="Home Work">Home Work</option>
          <option value="Group Work">Group Work</option>
          <option value="Subject Related">Subject Related</option>
          <option value="Extra Work">Extra Work</option>
        </select>
        {errors.type && <div className="text-red-500">{errors.type}</div>
        }
      </div>

      <div className="mb-4">
        <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
          Grade:
        </label>
        <select
          name="grade"
          id="grade"
          className={`form-control ${errors.grade ? 'border-red-500' : ''}`}
          value={assignment.grade}
          onChange={handleInputChange}
          required
        >
          <option value="">Select grade</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
        </select>
        {errors.grade && <div className="text-red-500">{errors.grade}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Subject:
        </label>
        <input
          type="text"
          className={`form-control ${errors.subject ? 'border-red-500' : ''}`}
          id="subject"
          name="subject"
          value={assignment.subject}
          onChange={handleInputChange}
        />
        {errors.subject && <div className="text-red-500">{errors.subject}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
          Deadline:
        </label>
        <input
          type="date"
          className={`form-control ${errors.deadline ? 'border-red-500' : ''}`}
          id="deadline"
          name="deadline"
          value={assignment.deadline}
          onChange={handleInputChange}
        />
        {errors.deadline && <div className="text-red-500">{errors.deadline}</div>}
      </div>

      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="!block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="large_size"
        />
      </div>

      <button type='submit' className="btn btn-primary" style={{ marginTop: '10px' ,backgroundColor: 'blue' }}>
        Create
      </button>
    </form>
  );
}

export default AssignmentForm;
