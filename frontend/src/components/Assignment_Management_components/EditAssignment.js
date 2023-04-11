import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditAssignment = ({ assignmentId }) => {
  // State to store assignment data
  const [assignment, setAssignment] = useState({
    type: '',
    grade: '',
    guidelines: '',
    deadline: ''
  });

  // Fetch assignment data from server
  useEffect(() => {
    axios.get(`/assignments/${assignmentId}`)
      .then(response => {
        setAssignment(response.data);
      })
      .catch(error => {
        console.error('Error fetching assignment data:', error);
      });
  }, [assignmentId]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send updated assignment data to server
      await axios.patch(`/assignments/update/${assignmentId}`, assignment);

      // Redirect to assignment details page or show success message
      // depending on your implementation
      console.log('Assignment updated successfully!');
    } catch (error) {
      console.error('Error updating assignment:', error);
    }
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignment(prevAssignment => ({
      ...prevAssignment,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Edit Assignment</h1>
      <form onSubmit={handleSubmit}>
        <label>Type:</label>
        <input type="text" name="type" value={assignment.type} onChange={handleChange} />
        <br />
        <label>Grade:</label>
        <input type="text" name="grade" value={assignment.grade} onChange={handleChange} />
        <br />
        <label>Guidelines:</label>
        <textarea name="guidelines" value={assignment.guidelines} onChange={handleChange}></textarea>
        <br />
        <label>Deadline:</label>
        <input type="date" name="deadline" value={assignment.deadline} onChange={handleChange} />
        <br />
        <button type="submit">Update Assignment</button>
      </form>
    </div>
  );
};

export default EditAssignment;
