import React, { useState } from 'react';
import axios from 'axios';

const AssignmentForm = () => {
  const [type, setType] = useState('');
  const [grade, setGrade] = useState('');
  const [guidelines, setGuidelines] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const assignment = { type, grade, guidelines, deadline };
      await axios.post('/api/assignments', assignment); // Replace with the actual API endpoint for creating assignments
      // Handle success, e.g. show a success message
    } catch (err) {
      // Handle error, e.g. show an error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render form fields for type, grade, guidelines, and deadline */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AssignmentForm;
