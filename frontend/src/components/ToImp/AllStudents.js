import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllStudents = () => {
    const [students, setStudents] = useState([]);
    const [registeredStudent, setRegStudents] = useState([]);

    useEffect(() => {
        axios.get('/api/newuser/all')
            .then(res => {
                setStudents(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleDelete = (_id) => {
        const student = students.find(student => student._id === _id);
        const confirmed = window.confirm(`Are you sure you want to Delete ${student.name}?`);
        if (confirmed) {
            axios.delete(`/api/newuser/delete/${_id}`)
                .then(res => {
                    setStudents(students.filter(student => student._id !== _id));
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    const handleRegisterStudents = (_id) => {
        const student = students.find(student => student._id === _id);
        const confirmed = window.confirm(`Are you sure you want to register ${student.name}?`);
        if (confirmed) {
            axios.put(`/api/newuser/register/${_id}`, { registered: true })
                .then(res => {
                    const updatedStudent = res.data;
                    const updatedStudents = students.map(student => {
                        if (student._id === _id) {
                            return { ...student, registered: true };
                        }
                        return student;
                    });
                    setStudents(updatedStudents);

                    // Add the updated student data to the 'regUsers' database
                    axios.post('/api/user/add', updatedStudent)
                        .then(res => {
                            const registeredStudent = res.data;
                            console.log('Reg Student data added to DB:', res.data);
                            setRegStudents(registeredStudent);
                            sendEmail(registeredStudent);
                        })
                        .catch(err => {
                            console.log(err);
                            alert('Could not add student data to regUsers database. Registration reverted.');
                            axios.put(`/api/newuser/register/${_id}`, { registered: false })
                                .then(res => {
                                    const updatedStudents = students.map(student => {
                                        if (student._id === _id) {
                                            return { ...student, registered: false };
                                        }
                                        return student;
                                    });
                                    setStudents(updatedStudents);
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    //sending mail
    const sendEmail = async (registeredStudent) => {   //send email 
        try {
            const response = await axios.post('/api/reports/send-report-email', {
                to: `${registeredStudent.email}`,
                // to: `${user?.email}`,
                subject: `Thilina Institute Registration Confirmation`,
                body:
                    `Registration Confirmation ${registeredStudent.name}\n 
                Name : ${registeredStudent.name}\n
                Student ID & Username : ${registeredStudent.studentID}\n
                Password : ${registeredStudent.password}\n
                Email : ${registeredStudent.email}\n
                Whatsapp Number : ${registeredStudent.whatsappNumber}\n\n\n

                You can use this username & password to login to the thilinainstitute.lk\n
                You can change password as you prefer.
              `,
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
            //setError('Error sending email');
        }

        //setLoading(false);
    }


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
                            <td>{student._id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.whatsappNumber}</td>
                            <td>{student.phoneNumber}</td>
                            <td>{student.address}</td>
                            <td>{student.grades.join(', ')}</td>
                            <td>{student.registered ? 'Registered' : 'Not Registered'}</td>
                            <td>
                                <button onClick={() => handleDelete(student._id)}>Delete</button>
                                {!student.registered && (
                                    <button onClick={() => handleRegisterStudents(student._id)}>Register</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllStudents;