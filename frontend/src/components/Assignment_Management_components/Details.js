import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Details = ({ assignmentId }) => {
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    // Fetch assignment data from API endpoint using assignmentId
    axios.get(`http://localhost:9090/getAss/${assignmentId}`)
      .then(res => {
        // Update state with fetched assignment data
        setAssignment(res.data);
      })
      .catch(err => console.log(err));
  }, [assignmentId]);

  if (!assignment) {
    return <div>Loading...</div>; // Add a loading state while fetching data
  }

  return (
    <div className='container'>
      <h2>Assignment Details</h2>
      <div>
        <h4>Type: {assignment.type}</h4>
        <p>Grade: {assignment.grade}</p>
        <p>Guidelines: {assignment.guidelines}</p>
        <p>Deadline: {assignment.deadline}</p>
        {assignment.image && <img src={assignment.image} alt="Assignment Image" />}
      </div>
    </div>
  );
}

export default Details;
