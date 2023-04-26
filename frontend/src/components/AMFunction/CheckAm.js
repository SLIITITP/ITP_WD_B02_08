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
        <div className="flex flex-wrap -mx-3 mb-2 p-3 text-md font-semibold" >
            <h2 className="text-xl font-bold mb-4">Search Attendance</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <label htmlFor="grade" className="block sm:w-1/4">
                            Grade:
                        </label>
                        <input
                            type="text"
                            id="grade"
                            name="grade"
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:w-3/4"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <label htmlFor="subject" className="block sm:w-1/4">
                            Subject:
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:w-3/4"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <label htmlFor="date" className="block sm:w-1/4">
                            Date:
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:w-3/4"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <label htmlFor="studentID" className="block sm:w-1/4">
                            Student ID:
                        </label>
                        <input
                            type="text"
                            id="studentID"
                            name="studentID"
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:w-3/4"
                        />
                    </div>
                    <button
                        type="submit"
                        className="inline-block px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Search
                    </button>
                </div>
            </form>
            <div>
                {searchResults.length > 0 && (
                    <table className="mt-6 w-full border-collapse">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {searchResults.map((attendance) => (
                                <tr key={attendance._id}>
                                    <td className="px-4 py-2 text-sm text-gray-500">{new Date(attendance.date).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 text-sm text-gray-500">{attendance.time}</td>
                                    <td className="px-4 py-2 text-sm text-gray-500">{attendance.subject.subjectName}</td>
                                    <td className="px-4 py-2 text-sm text-gray-500">{attendance.teacher}</td>
                                    <td className="px-4 py-2 text-sm text-gray-500">{attendance.student.name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-500">{attendance.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div >
    );
};

export default CheckAm;