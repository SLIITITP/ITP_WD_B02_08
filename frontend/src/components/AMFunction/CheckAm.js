import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckAm = () => {

    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);

    // Fetch subjects and students on component mount
    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch subjects
                const subjectResponse = await fetch('/api/subject/subjects');
                const subjectData = await subjectResponse.json();
                setSubjects(subjectData);

                // Fetch students
                const studentResponse = await fetch('/api/user/list');
                const studentData = await studentResponse.json();
                // console.log(studentData);
                // console.log(typeof studentData);
                setStudents(studentData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);


    const [searchQuery, setSearchQuery] = useState({
        grade: '',
        subject: '',
        date: '',
        studentID: ''
    });

    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {
        setSearchQuery({
            ...searchQuery,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('/api/amnip/search', {
                params: searchQuery
            });
            setSearchResults(response.data.attendance);

        } catch (error) {
            console.error(error);
        }
        
        console.log(searchResults);
    };

    return (
        <div>
            <h2>Search Attendance</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="grade">Grade:</label>
                    <input type="text" id="grade" name="grade" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="subject">Subject:</label>
                    <input type="text" id="subject" name="subject" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="studentID">Student ID:</label>
                    <input type="text" id="studentID" name="studentID" onChange={handleChange} />
                </div>
                <button type="submit">Search</button>
            </form>
            {searchResults.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Subject</th>
                            <th>Teacher</th>
                            <th>Student</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((attendance) => (
                            <tr key={attendance._id}>
                                <td>{new Date(attendance.date).toLocaleDateString()}</td>
                                <td>{attendance.time}</td>
                                <td>{attendance.subject.subjectName}</td>
                                <td>{attendance.teacher}</td>
                                <td>{attendance.student.name}</td>
                                <td>{attendance.grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CheckAm;