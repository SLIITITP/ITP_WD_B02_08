import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisteredStudents() {

    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await axios('/api/user/list'); // Replace with your API endpoint
            setData(result.data);
        }
        fetchData();
    }, []);

    const handleUpdate = (id) => {
        navigate('/updateregstd', {
            state: {
                sID: id
            }
        });
    }

    const handleDelete = (id) => {
        // Code to delete the item with the given id
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Grades</th>
                    <th>WhatsApp Number</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Actions</th>
                    <th>Password</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.studentID}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.grades.join(',')}</td>
                        <td>{item.whatsappNumber}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.address}</td>
                        <td>
                            <button onClick={() => handleDelete(item._id)}>Delete</button>
                            <button onClick={() => handleUpdate(item._id)}>Update</button>
                        </td>
                        <td>{item.password}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default RegisteredStudents;