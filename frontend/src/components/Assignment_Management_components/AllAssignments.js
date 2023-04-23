


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [searchGrade, setSearchGrade] = useState("");
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

  const handleEdit = (id) => {
    navigate(`/a3/${id}`);
  };


  //search bar

  const handleSearch = (e) => {
    setSearchGrade(e.target.value);
  };

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.grade.toLowerCase().includes(searchGrade.toLowerCase())
  );


  return (
    <div>
         <h1 className="text-center my-5" style={{ fontSize: '2rem' }}>
        All Assignments
      </h1>

      <div className="mb-3">
        <label htmlFor="searchGrade" className="form-label">
         
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Serch By Grade"
          id="searchGrade"
          value={searchGrade}
          onChange={handleSearch}
        />
      </div>


      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>Guidelines</th>
            <th>Deadline</th>
            <th>Resources</th>
            <th>Edit</th>
            <th>Delete</th>
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
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEdit(assignment._id)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={async () => {
                    const response = await fetch(
                      `http://localhost:9090/as/deleteAssignments/${assignment._id}`,
                      {
                        method: "DELETE",
                      }
                    );
                    if (response.ok) {
                      setAssignments((prevState) =>
                        prevState.filter(
                          (prevAssignment) =>
                            prevAssignment._id !== assignment._id
                        )
                      );
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <button className="btn btn-primary" onClick={() => navigate("/a1")}>
        Create
      </button>
  
    </div>
  );
  
};

export default AllAssignments;
