import React, { useState } from 'react';
import axios from 'axios';
import { validateAssignmentFeedbackForm } from './validateAssignmentFeedbackForm';


const AssignmentFeedback = () => {
  const [teachersEmail, setTeachersEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [assignmentType, setAssignmentType] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  //Create a state variable to store the errors
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validateAssignmentFeedbackForm(teachersEmail, grade, assignmentType, email, message);

    if (Object.keys(errors).length === 0) {
      const newFeedback = {
        teachersEmail,
        grade,
        assignmentType,
        email,
        message
      };

      axios.post('feed/addFeedback', newFeedback)
        .then(res => console.log(res.data))
        .catch(err => console.log('Error: ' + err));

      setTeachersEmail('');
      setGrade('');
      setAssignmentType('');
      setEmail('');
      setMessage('');
    } else {
      // Handle form errors, e.g., display error messages
      setFormErrors(errors);
    }
  };

  return (

    <div className="row">
      <div className="mx-auto col-10 col-md-8 col-lg-6">

        <form onSubmit={handleSubmit} class="max-w-lg">

          <style>
            {`.form-label {
              font-weight: bold;
            }`

            }
          </style>


          <style>
            {`
    .error {
      color: red;
    }
  `}
          </style>
          <div class="mb-3">
            <label class="form-label" for="teacher-name">Teacher's Email:</label>
            <input id="teacher-name" type="email" class="form-control" value={teachersEmail} onChange={(e) => setTeachersEmail(e.target.value)} />
            {formErrors.teachersEmail && <div className="error">{formErrors.teachersEmail}</div>}
          </div>

          <div class="mb-3">
            <label class="form-label" for="grade">Grade:</label>
            <select name="grade" id="grade" class="form-select" value={grade} onChange={(e) => setGrade(e.target.value)}>
              <option value="">Select grade</option>
              <option value="6">1</option>
              <option value="6">2</option>
              <option value="6">3</option>
              <option value="6">4</option>
              <option value="6">5</option>

              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
            </select>
            {formErrors.grade && <div className="error">{formErrors.grade}</div>}
          </div>

          <div class="mb-3">
           
            <label class="form-label" for="assignment-type">Assignment Type:</label>

            <select name="type" id="assignment-type" class="form-select" value={assignmentType} onChange={(e) => setAssignmentType(e.target.value)}>
              <option value="">Select Assignment Type</option>
              <option value="Home Work">Home Work</option>
              <option value="Group Work">Group Work</option>
              <option value="Subject Related">Subject Related</option>
              <option value="Extra Work">Extra Work</option>
            </select>
            {formErrors.assignmentType && <div className="error">{formErrors.assignmentType}</div>}
          </div>

          

          <div class="mb-3">
            <label class="form-label" for="email">Email:</label>
            <input id="email" type="text" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            {formErrors.email && <div className="error">{formErrors.email}</div>}
          </div>

          <div class="mb-3">
            <label class="form-label" for="message">Message:</label>
            <textarea id="message" class="form-control" rows="5" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            {formErrors.message && <div className="error">{formErrors.message}</div>}
          </div>
          <button
            className="btn btn-primary">
            Submit
          </button>


        </form>




      </div>
    </div>
  );

};

export default AssignmentFeedback;




