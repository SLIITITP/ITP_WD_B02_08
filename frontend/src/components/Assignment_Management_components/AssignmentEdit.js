import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AssignmentEdit = () => {
  const [assignment, setAssignment] = useState({});
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
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
        deadline,
      }),
    });
    if (response.ok) {
      navigate("/a2");
    }
  };

  return (
    <div className="container">

      <h1 className="text-center my-5" style={{ fontSize: '2rem' }}>
        Edit Assignment
      </h1>


      <form onSubmit={handleSubmit}>
        <div class="form-group" style={{ marginTop: '15px' ,marginBottom: '15px'}} >
          <label for="type">Assignment Type:</label>
          <input type="text" class="form-control" id="type" value={type} onChange={handleTypeChange} />
        </div>
        <div class="form-group" style={{ marginTop: '15px',marginBottom: '15px' }}>
          <label for="subject">Subject:</label>
          <input type="text" class="form-control" id="subject" value={subject} onChange={handleSubjectChange} />
        </div>
        <div class="form-group" style={{ marginTop: '15px' }}>
          <label for="grade">Grade:</label>
          <input type="text" class="form-control" id="grade" value={grade} onChange={handleGradeChange} />
        </div>
       
        <div class="form-group"  style={{ marginTop: '15px' }}>
          <label for="deadline">Deadline:</label>
          <input type="date" class="form-control" id="deadline" value={deadline} onChange={handleDeadlineChange} />
        </div>

        <button
          className="btn btn-primary"  style={{ marginTop: '15px' }}>
          Save
        </button>


      </form>

    </div>
  );

};

export default AssignmentEdit;
