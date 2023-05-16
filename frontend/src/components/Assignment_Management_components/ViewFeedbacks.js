import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Form } from 'react-bootstrap';
import { getProfileTeacher } from "../../apicalls/helper";

const ViewFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [apiData1, setApiData1] = useState({});

  useEffect(() => {
    axios.get('http://localhost:9090/feed/getFeedback')
      .then(res => setFeedbacks(res.data))
      .catch(err => console.log('Error: ' + err));
  }, []);

  useEffect(() => {
    const usernameFrom = localStorage.getItem("userName");
    getProfileTeacher(usernameFrom).then((results) => {
      setApiData1(results.data);
      console.log(results.data);
    });
  }, []);

  const handleReply = (feedback) => {
    console.log(`Replying to feedback ${feedback.id}`);
    navigate(`/emailAss?email=${feedback.email}`);
  };

  const handleSearch = () => {
    axios.get(`http://localhost:9090/feed/getFeedbackByTeachersName/${searchTerm}`)
      .then(res => setFeedbacks(res.data))
      .catch(err => console.log('Error: ' + err));
  };

  const registeredTeacherEmail = apiData1.email;

  const filteredFeedbacks = feedbacks.filter(feedback => feedback.teachersName === registeredTeacherEmail);

  return (
    <div className="container">
      <h1 className="text-center my-5" style={{ fontSize: '2rem' }}>
        View Feedbacks
      </h1>

      <div style={{ marginTop: '50px' }}>
        <Form inline striped bordered hover>
          <Form.Control
            type="text"
            placeholder="Search by Teacher's Name"
            className="mr-sm-2"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </Form>

        <Table style={{ marginTop: "4rem" }}>
          <thead>
            <tr>
              <th>Teacher's Name</th>
              <th>Grade</th>
              <th>Assignment Type</th>
              <th>Email</th>
              <th>Message</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((feedback, index) => (
              <tr key={index}>
                <td>{feedback.teachersName}</td>
                <td>{feedback.grade}</td>
                <td>{feedback.assignmentType}</td>
                <td>{feedback.email}</td>
                <td>{feedback.message}</td>
                <td>
                  <button onClick={() => handleReply(feedback)} className="btn btn-primary">
                    Reply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewFeedbacks;
