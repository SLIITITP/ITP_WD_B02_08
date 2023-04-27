import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';

const CheckAm = () => {

    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);

    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);



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

    //getting subject details and fetch
    const [subjectList, setSubjectList] = useState([]);
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/subject/subjects');
                setSubjectList(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSubjects();
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

    //formatting date
    const formatDate = (date) => {
        return moment(date).format('MMM DD, YYYY');
    };

    //pdf printing parts
    const componentRef = useRef();

    const handleDownload = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Set the title of the PDF document
        doc.setProperties({
            title: 'Attendance - Thilina Institute',
            subject: 'Attendance',
            author: 'Thilina Institute',
            keywords: '',
            creator: ''
        });

        // Define the table columns
        const columns = ['Date', 'TIme', 'Student', 'Grade'];

        // Define the table rows
        const rows = searchResults.map((attendance) => [
            new Date(attendance.date).toLocaleDateString(),
            attendance.time,
            attendance.student.name - attendance.studentID,
            attendance.grade
        ]);

        // Set the font size and style for the table header
        doc.setFontSize(20);
        doc.setFont("courier", "bold");

        // Draw the table content
        doc.text('Attendance Report', 14, 20);

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");

        doc.text(`Subject Name: ${searchQuery.subject || "all"}`, 14, 30)
        doc.text(`Date: ${new Date(searchQuery.date).toLocaleDateString()} `, 150, 30)
        doc.text(`Grdae : ${searchQuery.grade || "--"}`, 14, 37)
        doc.text(`Teacher: ${searchQuery.teacher} || 'All'`, 150, 37)

        doc.autoTable({
            startY: 45,
            head: [columns],
            body: rows,
        });
        // Save the PDF file with the name
        doc.save(`Attendance ${searchQuery.teacher} ${formatDate(currentDateTime)}.pdf`);
    };

    return (
        <div>
            {/* <h2 className="get-center text-xl font-bold mb-4">Search Attendance</h2> */}
            <form onSubmit={handleSubmit} class="flex flex-wrap justify-center items-center space-y-4">
                <div class="w-full md:w-1/4 px-3">
                    <label htmlFor="grade" class="block">Grade:</label>
                    <select id="grade" name="grade" onChange={handleChange} class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        <option value="">Select grade</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="w-full md:w-1/4 px-3">
                    <label htmlFor="subject" class="block">Subject:</label>
                    <select id="subject" name="subject" onChange={handleChange} className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                        <option value="">Select Subject</option>
                        {subjectList.map((sub) => (
                            <option key={sub.subjectID} value={sub._id}>
                                {sub.subjectName} {sub.subjectTeacherName}
                            </option>
                        ))}
                    </select>
                </div>
                <div class="w-full md:w-1/4 px-3">
                    <label htmlFor="date" class="block">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        onChange={handleChange}
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div class="w-full md:w-1/4 px-3">
                    <label htmlFor="studentID" class="block">Student ID:</label>
                    <input
                        type="text"
                        id="studentID"
                        name="studentID"
                        onChange={handleChange}
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div class="w-full text-center">
                    <button
                        type="submit"
                        class="inline-block px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Search
                    </button>
                    <ReactToPrint
                        // trigger={() => <button>Print</button>}
                        content={() => componentRef.current}
                    />
                    <button
                        type="button"
                        class="inline-block ml-4 px-4 py-2 text-base font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={handleDownload}
                    >
                        Download
                    </button>
                </div>
            </form>

            <div>
                {searchResults.length > 0 && (
                    <table ref={componentRef} className="mt-6 w-full border-collapse">
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
                                    <td className="px-4 py-2 text-sm text-gray-500">{attendance.student.name} - ({attendance.studentID})</td>
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