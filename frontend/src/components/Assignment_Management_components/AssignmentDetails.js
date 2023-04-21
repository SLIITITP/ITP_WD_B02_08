
import React from 'react';

const AssignmentDetails = ({ assignment}) => {
  return (
    <div>
      <h2>{assignment.type}</h2>
      <p><strong>Grade:</strong> {assignment.grade}</p>
      <p><strong>Subject:</strong> {assignment.subject}</p>
      <p><strong>Guidelines:</strong> {assignment.guidelines}</p>
      <p><strong>Deadline:</strong> {assignment.deadline}</p>
      {assignment.image && <img src={assignment.image} alt="Assignment Image" />}
    </div>
  );
}

export default AssignmentDetails;
