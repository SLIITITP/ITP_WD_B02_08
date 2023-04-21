import React, { useState } from 'react';
import axios from 'axios';

const AssignmentFeedback = () => {
  const [teachersName, setTeachersName] = useState('');
  const [grade, setGrade] = useState('');
  const [assignmentType, setAssignmentType] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFeedback = {
      teachersName,
      grade,
      assignmentType,
      email,
      message
    };

    axios.post('feed/addFeedback', newFeedback)
      .then(res => console.log(res.data))
      .catch(err => console.log('Error: ' + err));

    setTeachersName('');
    setGrade('');
    setAssignmentType('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="container">
      <h3>Assignment Feedback Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Teacher's Name:</label>
          <input type="text" className="form-control" value={teachersName} onChange={(e) => setTeachersName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Grade:</label>
          <input type="text" className="form-control" value={grade} onChange={(e) => setGrade(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Assignment Type:</label>
          <input type="text" className="form-control" value={assignmentType} onChange={(e) => setAssignmentType(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Message:</label>
          <textarea className="form-control" rows="5" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AssignmentFeedback;
