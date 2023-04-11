import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../stylesheets/Payment.css'


function ViewPayment() {


    const [searchCriteria, setSearchCriteria] = useState({
        subject: '',
        grade: '',
        month: '',
        studentId: '',
    });
    const [payments, setPayments] = useState([]);

    const handleChange = async (event) => {
        const { name, value } = event.target;
        setSearchCriteria((prevState) => ({ ...prevState, [name]: value }));
        try {
            const res = await axios.get('/api/payment/payHistory', {
                params: { ...searchCriteria, [name]: value },
            });
            setPayments(res.data);
        } catch (err) {
            console.log(err);
        }
    };

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

    //Search user from ID or Name
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        setSearchTerm(event.target.value);
        setShowResults(true);

        axios.get(`http://localhost:9090/api/user/search/${searchTerm}`)
            .then((response) => {
                setSearchResults(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleResultClick = async (studentId) => {
        setSearchTerm(studentId);
        setSearchCriteria((prevState) => ({ ...prevState, studentId: studentId }));
        try {
            const res = await axios.get('/api/payment/payHistory', {
                params: { ...searchCriteria, studentId: studentId },
            });
            setPayments(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleClickOutside = (e) => {
        if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
            setShowResults(false);
        }
    };

    const [showResults, setShowResults] = useState(false);
    const searchBoxRef = useRef(null);

    useEffect(() => {
        // add event listener to detect click outside the search box
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const grades = ['5', '6', '7', '8', '9', '10', '11'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',];

    return (
        <div>
            <label>
                Subject:
                <select name="subject" value={searchCriteria.subject} onChange={handleChange}>
                    <option value="">Select Subject</option>
                    {subjectList.map((sub) => (
                        <option key={sub.subjectName} value={sub.subjectName}>
                            {sub.subjectName} {sub.subjectTeacherID}
                        </option>
                    ))}
                </select>

            </label>
            <label>
                Grade:
                <select name="grade" value={searchCriteria.grade} onChange={handleChange}>
                    <option value="">Select a grade</option>
                    {grades.map((grade) => (
                        <option key={grade} value={grade}>
                            {grade}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Month:
                <select name="month" value={searchCriteria.month} onChange={handleChange}>
                    <option value="">Select a month</option>
                    {months.map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </label>
            <label ref={searchBoxRef}>
                <div className="search-box" onClick={() => setShowResults(true)}>
                    <input
                        type="text"
                        placeholder="Search by ID or Name"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    {showResults && searchTerm && (
                        <ul className="search-results">
                            {searchResults.map((result) => (
                                <li key={result._id} onClick={() => handleResultClick(result.studentID)}>
                                    {result.studentID} - {result.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </label>

            <table>
                <thead>
                    <tr>
                        <th>Student ID---</th>
                        <th>Paid Amount---</th>
                        <th>Date---</th>
                        <th>Month---</th>
                        <th>Grade---</th>
                        <th>Subjects---</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment._id}>
                            <td>{payment.studentId}</td>
                            <td>{payment.paidAmount}</td>
                            <td>{payment.date}</td>
                            <td>{payment.month}</td>
                            <td>{payment.grade}</td>
                            <td>{payment.subjects.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewPayment;
