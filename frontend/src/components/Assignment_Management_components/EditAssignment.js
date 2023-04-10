import React, { useState, useEffect } from 'react';

import axios from 'axios';

const EditAssignment = ({ match }) => {
    const [assignment, setAssignment] = useState({
        type: "",
        grade: "",
        guidelines: "",
        deadline: ""
    });

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const response = await axios.get(`/assignments/${match.params.id}`); // Replace with your API endpoint
                setAssignment(response.data);
            } catch (error) {
                console.error('Failed to retrieve assignment:', error);
            }
        };

        fetchAssignment();
    }, [match.params.id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setAssignment({
            ...assignment,
            [name]: value
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/assignments/update/${match.params.id}`, assignment); // Replace with your API endpoint
            if (response.data.success) {
                alert("Assignment Updated Successfully");
                // Optional: Redirect to a different page or perform other actions upon successful update
            }
        } catch (error) {
            console.error('Failed to update assignment:', error);
        }
    }

    const { type, grade, guidelines, deadline } = assignment;

    return (
        <div className="container">
            <h1>Edit Assignment</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Type</label>
                    <input type="text" className="form-control" placeholder="Enter Type" name="type" id="type" value={assignment.type} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Grade</label>
                    <input type="text" className="form-control" placeholder="Enter Grade" name="grade" id="grade" value={assignment.grade} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Guidelines</label>
                    <input type="text" className="form-control" placeholder="Enter Guidelines" name="guidelines" id="guidelines" value={assignment.guidelines} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Deadline</label>
                    <input type="text" className="form-control" placeholder="Enter Deadline" name="deadline" id="deadline" value={assignment.deadline} onChange={handleInputChange} />
                </div>
                <button className="btn btn-success" type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditAssignment;
