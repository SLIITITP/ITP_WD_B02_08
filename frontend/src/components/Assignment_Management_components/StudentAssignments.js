
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      const response = await fetch("http://localhost:9090/as/getAssignments");
      const data = await response.json();
      setAssignments(data.assignments);
    };
    fetchAssignments();
  }, []);

  const downloadFile = async (id, filename) => {
    const response = await fetch(`http://localhost:9090/as/DownloadAss/${id}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <div className="container">
     
      <h1 className="text-center my-5" style={{ fontSize: '2rem' }}>
        All Assignments
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>Guidelines</th>
            <th>Deadline</th>
            <th>Resources</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id}>
              <td>{assignment.type}</td>
              <td>{assignment.subject}</td>
              <td>{assignment.grade}</td>
              <td>{assignment.guidelines}</td>
              <td>{assignment.deadline}</td>
              <td>
                {assignment.file && (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      downloadFile(assignment._id, assignment.file);
                    }}
                  >
                    Download
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default StudentAssignments;
