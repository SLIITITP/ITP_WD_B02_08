import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../apicalls/helper";
import axios from "axios";
import { useSelector } from "react-redux";

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [assignment1, setAssignments1] = useState([]);
  const navigate = useNavigate();
  const [apiData1, setApiData1] = useState({});

  const subjects = assignment1.map((assignment) => assignment.subject);
  console.log(subjects);

  const id = apiData1.grade;

  //filter assignments according to the grade
  useEffect(() => {
    const filteredAssignments = assignment1.filter((assignment) => assignment.grade === id);
    if (filteredAssignments.length > 0) {
      setAssignments(filteredAssignments);
      console.log(filteredAssignments);
    }
  }, [assignment1, id]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const response = await fetch("http://localhost:9090/as/getAssignments");
      const data = await response.json();
      setAssignments1(data.assignments);
    };
    fetchAssignments();
  }, []);

  useEffect(() => {
    const usernameFrom = localStorage.getItem("userName");
    getProfile(usernameFrom).then((results) => {
      setApiData1(results.data);
      console.log(results.data)
    });
  }, []);

  const downloadFile = async (id, filename) => {
    const response = await fetch(`http://localhost:9090/as/DownloadAss/${id}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  //niun

  const { user } = useSelector((state) => state.users);
  const studentId = apiData1.studentId;
  console.log(studentId);

  const [subs, setSubs] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setSubs(assignments.subject);
  //   console.log(subs);
  // }, []);

  const handleCheckPayment = async (Cid, Cfile, Csubject) => {
    setLoading(true);
    try {
      const currentDate = new Date();
      const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
      console.log(currentMonth);
      const response = await axios.get('/api/payment/payHistory', {
        params: {
          studentId: studentId,
          Csubject,
          month: currentMonth,
        },
      });
      const payments = response.data;
      console.log(payments);
      setIsPaid(payments.length > 0);
      if(isPaid){
        downloadFile(Cid, Cfile);
      }else{
        alert('No payment Found')
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };


  //nipun
  return (
    <div className="container">
      <h1 className="text-center my-5" style={{ fontSize: "2rem" }}>
        All Assignments
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Subject</th>
            <th>Grade</th>
          
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

              <td>{assignment.deadline}</td>
              <td>
                {assignment.file && (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      // downloadFile(assignment._id, assignment.file);
                      handleCheckPayment(assignment._id, assignment.file, assignment.subject);
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
