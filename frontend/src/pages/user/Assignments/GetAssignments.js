import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Fetch assignments data from API endpoint
    axios.get('http://localhost:9090/getAss')
      .then(res => {
        // Update state with fetched assignments data
        setAssignments(res.data);
      })
      .catch(err => console.log(err));
  }, []);


  // Define onDelete function
  const onDelete = async (assignmentId) => {
    try {
        await axios.delete(`/deleteAss/${assignmentId}`); // Replace with your API endpoint for deleting assignments
        // Update assignments state after successful deletion
        setAssignments(assignments.filter(assignment => assignment._id !== assignmentId));
    } catch (error) {
        console.error('Failed to delete assignment:', error);
    }
}

  return (
    <div className='container'>
      <h2>Assignments List</h2>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Type</th>
            <th>Grade</th>
            <th>Guidelines</th>
            <th>Deadline</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(assignment => (
            <tr key={assignment.id}>
              <td>{assignment.type}</td>
              <td>{assignment.grade}</td>
              <td>{assignment.guidelines}</td>
              <td>{assignment.deadline}</td>
              <td>{assignment.image && <img src={assignment.image} alt="Assignment Image" />}</td>


              <td>
                <a className="btn btn-warning" href={`/editAss/${assignment._id}`}>
                  <i className="fas fa-edit"></i>&nbsp;Edit
                </a>


                &nbsp;
                <a className="btn btn-danger" href="#" onClick={() => onDelete(assignment._id)}>
                  <i className=" fas fa-trash-alt"></i>&nbsp;Delete
                </a>

              </td>

            </tr>
          ))}
        </tbody>
      </table>



      
    </div>


  );
}

export default GetAssignments;
