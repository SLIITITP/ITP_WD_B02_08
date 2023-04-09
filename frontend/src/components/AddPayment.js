import { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/Payment.css'

function GetPayment() {
    //set values
    const [studentId, setStudentId] = useState('');
    const [grade, setGrade] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [month, setMonth] = useState('');
    const [paidAmount, setAmount] = useState(0);
    //const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
    //set subject list getting from DB
    const [subjectList, setSubjectList] = useState([]);
    //set selected subjects
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    //search student details
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const now = new Date();
    const ldate = now.toLocaleDateString('en-CA');
    const ltime = now.toLocaleTimeString('en-US', { hour12: false });
    const [date, setDate] = useState(`${ldate}T${ltime}`);

    console.log(date)
    //getting subject details and fetch
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



    //Sum the total of selecting
    const handleCheckboxChange = (event, sub) => {
        if (event.target.checked) {
            setSelectedSubjects([...selectedSubjects, sub]);
            setAmount(prevAmount => prevAmount + sub.subjectAmount);
            setSubjects(prevSubjects => [...prevSubjects, sub.subjectName]);
        } else {
            setSelectedSubjects(selectedSubjects.filter((s) => s._id !== sub._id));
            setAmount(prevAmount => prevAmount - sub.subjectAmount);
            setSubjects(prevSubjects => prevSubjects.filter((s) => s !== sub.subjectName));
        }
    };

    const totalAmount = selectedSubjects.reduce((total, sub) => total + sub.subjectAmount, 0);

    //handleSubmit for Adding payemnts
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:9090/api/payment/add', { studentId, date, month, subjects, grade, paidAmount });
            alert('Payment added successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to add Payment!');
        }
    };

    const [payments, setPayments] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleStudentIdChange = (event) => {
        setStudentId(event.target.value);
    };

    //handleSubmit for search previous payments
    const handleSearchClick = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/api/payment/history/${studentId}`);
            setPayments(response.data);
            setErrorMessage('');
        } catch (err) {
            setPayments([]);
            setErrorMessage(err.response.data.message);
        }
    };


    //search student details
    //search ekata oni useeffect eka(searchTerm)
    useEffect(() => {
        const search = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/user/search/${searchTerm}`);
                setSearchResults(response.data);
            } catch (err) {
                setSearchResults([]);
            }
        };

        if (searchTerm.length > 0) {
            search();
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    //AAAAAAAAAAAAAA
    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className='container'>
            <div className='split-left'>
                <h1>Student Payment Collecting</h1>
                <form onSubmit={handleSubmit} className='split-left'>
                    <div>
                        <label>
                            Student ID:
                            <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Grade:
                            <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                                <option value="">--Select Grade--</option>
                                <option value="1">Grade 1</option>
                                <option value="2">Grade 2</option>
                                <option value="3">Grade 3</option>
                                <option value="4">Grade 4</option>
                                <option value="5">Grade 5</option>
                                <option value="6">Grade 6</option>
                                <option value="7">Grade 7</option>
                                <option value="8">Grade 8</option>
                                <option value="9">Grade 9</option>
                                <option value="10">Grade 10</option>
                                <option value="11">Grade 11</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Month:
                            <select value={month} onChange={(e) => setMonth(e.target.value)}>
                                <option value="">--Select Month--</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>Amount: </label>
                        <input type="number" value={totalAmount} readOnly />
                    </div>
                    <div>
                        <label>Subjects:</label>
                        <ul>
                            {subjectList.map((sub) => (
                                <div key={sub._id}>
                                    <label htmlFor={`subject-${sub._id}`}>
                                        <input
                                            type='checkbox'
                                            id={`subject-${sub._id}`}
                                            value={sub.subjectAmount}
                                            checked={sub.checked}
                                            onChange={(event) => handleCheckboxChange(event, sub)}
                                        />
                                        {sub.subjectName} {sub.subjectTeacherID}
                                    </label>
                                </div>
                            ))}
                        </ul>

                    </div>
                    <div>
                        <label>
                            Date:
                            <input type="datetime-local" id="date" value={date} onChange={(event) => setDate(event.target.value)} />
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form >
                <div className='split-right'>
                    <button>Search by QR</button>
                    <button onClick={handleSearchClick}>See previous payments</button>
                    <div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                            placeholder="Search by ID or Name"
                        />

                        {searchResults.length === 0 ? (
                            <p>No results found.</p>
                        ) : (
                            <ul>
                                {searchResults.map((result) => (
                                    <li key={result._id} onClick={() => setStudentId(result.studentID)}>
                                        <p>{`ID: ${result.studentID}`}</p>
                                        <p>{`Name: ${result.name}`}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <div className='split-right'>
                <div>
                    <h2>Search for Payment Details</h2>
                    {errorMessage && <p>{errorMessage}</p>}
                    {payments.length > 0 && (
                        <div>
                            <h3>Payments for Student ID {studentId}:</h3>
                            <ul>
                                {payments.map((payment) => (
                                    <li key={payment._id}>
                                        Date: {payment.date}<br />
                                        Month: {payment.month}<br />
                                        Subjects: {payment.subjects.join(', ')}<br />
                                        Grade: {payment.grade}<br />
                                        Paid Amount: {payment.paidAmount}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

export default GetPayment;
