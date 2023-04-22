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

<div class="container mx-auto">
  <h3 class="text-lg font-medium mb-4">Assignment Feedback Form</h3>
  <form onSubmit={handleSubmit} class="max-w-lg">
    <div class="mb-4">
      <label class="block font-medium mb-2" for="teacher-name">Teacher's Name:</label>
      <input id="teacher-name" type="text" class="form-input" value={teachersName} onChange={(e) => setTeachersName(e.target.value)} />
    </div>

    <div class="mb-4">
      <label class="block font-medium mb-2" for="grade">Grade:</label>
      <select name="grade" id="grade" class="form-select" value={grade} onChange={(e) => setGrade(e.target.value)}>
        <option value="">Select grade</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block font-medium mb-2" for="assignment-type">Assignment Type:</label>
      <select name="type" id="assignment-type" class="form-select" value={assignmentType} onChange={(e) => setAssignmentType(e.target.value)}>
        <option value="">Select Assignment Type</option>
        <option value="Home Work">Home Work</option>
        <option value="Group Work">Group Work</option>
        <option value="Subject Related">Subject Related</option>
        <option value="Extra Work">Extra Work</option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block font-medium mb-2" for="email">Email:</label>
      <input id="email" type="email" class="form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>

    <div class="mb-4">
      <label class="block font-medium mb-2" for="message">Message:</label>
      <textarea id="message" class="form-textarea" rows="5" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
    </div>

    <div class="flex justify-end">
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
    </div>
  </form>
</div>

  )
   
};

export default AssignmentFeedback;
