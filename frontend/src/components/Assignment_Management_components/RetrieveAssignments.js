import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RetrieveAssignments = () => {
   const [assignments, setAssignments] = useState([]);


    useEffect(() => {
        // Fetch assignments data from backend API
        const fetchAssignments = async () => {
            try {
                const response = await axios.get('/assignments'); // Replace with your API endpoint
                setAssignments(response.data);
            } catch (error) {
                console.error('Failed to retrieve assignments:', error);
            }
        };

        fetchAssignments();
    }, []);

    // Define onDelete function
    const onDelete = async (assignmentId) => {
        try {
            await axios.delete(`/assignments/${assignmentId}`); // Replace with your API endpoint for deleting assignments
            // Update assignments state after successful deletion
            setAssignments(assignments.filter(assignment => assignment._id !== assignmentId));
        } catch (error) {
            console.error('Failed to delete assignment:', error);
        }
    }

    return (
        <div className=" container">
            <h1>Assignments</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Guidelines</th>
                        <th scope="col">Deadline</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map(assignment => (
                        <tr key={assignment._id}>
                            <td>{assignment.type}</td>
                            <td>{assignment.grade}</td>
                            <td>{assignment.guidelines}</td>
                            <td>{assignment.deadline}</td>



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
};

export default RetrieveAssignments;
