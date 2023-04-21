 import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:9090/feed/getFeedback')
            .then(res => setFeedbacks(res.data))
            .catch(err => console.log('Error: ' + err));
    }, []);


    const handleReply = (feedback) => {
        // Implement your reply logic here, using the feedback object
        console.log(`Replying to feedback ${feedback.id}`);

        // Navigate to the reply component
        //navigate(`/emailAss`);
        navigate(`/emailAss?email=${feedback.email}`);
    };

      
    return (
        <div className="container">
            <h3>View Feedbacks</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Teacher's Name</th>
                        <th>Grade</th>
                        <th>Assignment Type</th>
                        <th>Email</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map((feedback, index) => (
                        <tr key={index}>
                            <td>{feedback.teachersName}</td>
                            <td>{feedback.grade}</td>
                            <td>{feedback.assignmentType}</td>
                            <td>{feedback.email}</td>
                            <td>{feedback.message}</td>

                            <td>
                                <button onClick={() => handleReply(feedback)}>Reply</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewFeedbacks;
