import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('/api/user/list')
      .then(res => {
        setStudents(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleDelete = (_id) => {
    axios.delete(`/api/user/delete/${_id}`)
      .then(res => {
        setStudents(students.filter(student => student._id !== _id));
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Student List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Whatsapp Number</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Grades</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.studentID}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.whatsappNumber}</td>
              <td>{student.phoneNumber}</td>
              <td>{student.address}</td>
              <td>{student.grades.join(', ')}</td>
              <td>{student.registered}</td>
              <td>
                <button onClick={() => handleDelete(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllStudents;
