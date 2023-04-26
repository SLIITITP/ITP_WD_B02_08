import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Form } from 'react-bootstrap';
import back from '../../assets/MaterialBg.jpg';

const ViewFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:9090/feed/getFeedback')
            .then(res => setFeedbacks(res.data))
            .catch(err => console.log('Error: ' + err));
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

    const filteredFeedbacks = feedbacks.filter(feedback => feedback.teachersName.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="container">

<div className="opacity-50 absolute" style={{ zIndex: -1 }}>
        <img src={back} alt="logo" />
      </div>
            
            <h1 className="text-center my-5" style={{ fontSize: '2rem' }}>
            View Feedbacks
      </h1>


<Form inline striped bordered hover style={{ marginTop: '50px' }}>
                <Form.Control type="text" placeholder="Search by Teacher's Name" className="mr-sm-2"
                    value={searchTerm} onChange={e => setSearchTerm(e.target.value)}  style={{ marginBottom: "5rem" }}/>
               
            </Form>

            

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" style={{ backgroundColor: 'transparent',marginBottom: "1.5rem" }}  >
            
                <thead  className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400" >
                    <tr>
                        <th th scope="col" className="px-6 py-3">Teacher's Name</th>
                        <th th scope="col" className="px-6 py-3">Grade</th>
                        <th th scope="col" className="px-6 py-3">Assignment Type</th>
                        <th th scope="col" className="px-6 py-3">Email</th>
                        <th th scope="col" className="px-6 py-3">Message</th>
                        <th th scope="col" className="px-6 py-3">Response</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFeedbacks.map((feedback, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{feedback.teachersName}</td>
                            <td className="px-6 py-4">{feedback.grade}</td>
                            <td className="px-6 py-4">{feedback.assignmentType}</td>
                            <td className="px-6 py-4">{feedback.email}</td>
                            <td className="px-6 py-4">{feedback.message}</td>
                            <td className="px-6 py-4">
                                <button onClick={() => handleReply(feedback)}
                                    className="btn btn-primary">
                                   Reply
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewFeedbacks;
