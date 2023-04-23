import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AssignmentEdit = () => {
  const [assignment, setAssignment] = useState({});
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [guidelines, setGuidelines] = useState("");
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchAssignment = async () => {
      const response = await fetch(`http://localhost:9090/as/getAssignments/${id}`);
      const data = await response.json();
      setAssignment(data.assignment);
      setType(data.assignment.type || "");
      setSubject(data.assignment.subject || "");
      setGrade(data.assignment.grade || "");
      setGuidelines(data.assignment.guidelines || "");
      setDeadline(data.assignment.deadline || "");
    };
    fetchAssignment();
  }, [id]);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const handleGuidelinesChange = (event) => {
    setGuidelines(event.target.value);
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:9090/as/updateAssignments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        subject,
        grade,
        guidelines,
        deadline,
      }),
    });
    if (response.ok) {
      navigate("/a2");
    }
  };

  return (
    <div className="container">
      <h1>Edit Assignment</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input type="text" id="type" className="form-control" value={type} onChange={handleTypeChange} />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input type="text" id="subject" className="form-control" value={subject} onChange={handleSubjectChange} />
        </div>
        <div className="form-group">
          <label htmlFor="grade">Grade:</label>
          <input type="text" id="grade" className="form-control" value={grade} onChange={handleGradeChange} />
        </div>
        <div className="form-group">
          <label htmlFor="guidelines">Guidelines:</label>
          <textarea id="guidelines" className="form-control" value={guidelines} onChange={handleGuidelinesChange} />
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline:</label>
          <input type="date" id="deadline" className="form-control" value={deadline} onChange={handleDeadlineChange} />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
  
};

export default AssignmentEdit;
