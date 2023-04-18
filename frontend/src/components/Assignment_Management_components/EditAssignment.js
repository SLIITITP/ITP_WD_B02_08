
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateAssignment = () => {
  const [assignment, setAssignment] = useState(null); // State to store assignment data

  // Fetch assignment data from API endpoint on component mount
  useEffect(() => {
    // Fetch assignment data from API endpoint based on assignment ID
    axios.get(`/getAss/${assignment}`) // Replace with your API endpoint for fetching assignment data
      .then(res => {
        // Update state with fetched assignment data
        setAssignment(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // Update assignment data to API endpoint
  const onUpdate = async (updatedAssignmentData) => {
    try {
      await axios.put(`/updateAss/${assignment}`, updatedAssignmentData); // Replace with your API endpoint for updating assignment data
      // Update assignment state after successful update
      setAssignment(updatedAssignmentData);
      // Perform any other actions after successful update
      console.log('Assignment updated:', updatedAssignmentData);
    } catch (error) {
      console.error('Failed to update assignment:', error);
    }
  }

  // Render the UpdateAssignment form with assignment data
  return (
    <div>
      {/* Render the UpdateAssignment form with assignment data */}
      {assignment && (
        <form>
          {/* Render the form fields with assignment data */}
          <input type="text" value={assignment.type} onChange={(e) => setAssignment({ ...assignment, type: e.target.value })} />
          <input type="text" value={assignment.grade} onChange={(e) => setAssignment({ ...assignment, grade: e.target.value })} />
          <input type="text" value={assignment.guidelines} onChange={(e) => setAssignment({ ...assignment, guidelines: e.target.value })} />
          <input type="text" value={assignment.deadline} onChange={(e) => setAssignment({ ...assignment, deadline: e.target.value })} />
          <input type="file" value={assignment.image} onChange={(e) => setAssignment({ ...assignment, image: e.target.value })} />
          
          {/* Render the update button with onUpdate handler */}
          <button onClick={() => onUpdate(assignment)}>Update</button>
        </form>
      )}
    </div>
  );
}

export default UpdateAssignment;


