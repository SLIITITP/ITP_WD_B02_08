import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AssignmentDetails from './AssignmentDetails';





const StudentView = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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
    setShowGuidelines(true);
  };

  const handleDownloadClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9090/downloadAss/${id}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'assignment-image');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className='container'>
      <h2><center> Assignments List </center></h2>

      <div className="form-group">
        <label htmlFor="searchTerm">Search by Grade:</label>
        <input
          type="text"
          className="form-control"
          id="searchTerm"
          placeholder="Enter grade"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>

      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Type</th>
            <th>Grade</th>
            <th>Subject</th>
            <th>Deadline</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssignments.map(assignment => (
            <tr key={assignment.id}>
              <td>
                <button type="button" className="btn btn-link" onClick={() => handleAssignmentClick(assignment)}>
                  {assignment.type}
                </button>
              </td>
              <td>{assignment.grade}</td>
              <td>{assignment.subject}</td>
              <td>{assignment.deadline}</td>
              <td>{assignment.image && <img src={assignment.image} alt="Assignment Image" />}</td>

              <td>
  <button type="button" className="btn btn-primary" onClick={() => handleDownloadClick(assignment._id)}>
    Download
  </button>
</td>



            </tr>
          ))}
        </tbody>
      </table>

      {selectedAssignment && (
        <AssignmentDetails
          assignment={selectedAssignment}
          showGuidelines={showGuidelines}
          onClose={() => {
            setSelectedAssignment(null);
            setShowGuidelines(false);
          }}
        />
      )}
    </div>
  );
}

export default StudentView;
