/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const StudentView = () => {

  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch assignments data from API endpoint
    axios.get('http://localhost:9090/getAss')
      .then(res => {
        // Update state with fetched assignments data
        setAssignments(res.data);
      })
      .catch(err => console.log(err));
  }, []);

 



  

  return (
    <div className='container'>
      <h2><center> Assignments List </center></h2>

       
      
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Type</th>
            <th>Grade</th>
            <th>Subject</th>
            <th>Guidelines</th>
            <th>Deadline</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(assignment => (
            <tr key={assignment.id}>

<td >{assignment.type} </td>

             
              <td>{assignment.grade}</td>
              <td>{assignment.subject}</td>
              <td>{assignment.guidelines}</td>
              <td>{assignment.deadline}</td>
              <td>{assignment.image && <img src={assignment.image} alt="Assignment Image" />}</td>

            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
}

export default StudentView;
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AssignmentDetails from './AssignmentDetails';

const StudentView = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch assignments data from API endpoint
    axios.get('http://localhost:9090/getAss')
      .then(res => {
        // Update state with fetched assignments data
        setAssignments(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  return (
    <div className='container'>
      <h2><center> Assignments List </center></h2>

      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Type</th>
            <th>Grade</th>
            <th>Subject</th>
            <th>Guidelines</th>
            <th>Deadline</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(assignment => (
            <tr key={assignment.id}>
              <td>
                <a href="#" onClick={() => handleAssignmentClick(assignment)}>
                  {assignment.type}
                </a>
              </td>
              <td>{assignment.grade}</td>
              <td>{assignment.subject}</td>
              <td>{assignment.guidelines}</td>
              <td>{assignment.deadline}</td>
              <td>{assignment.image && <img src={assignment.image} alt="Assignment Image" />}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedAssignment && (
        <AssignmentDetails
          assignment={selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
        />
      )}
    </div>
  );
}

export default StudentView;
