import { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/GetPayment.css'

function GetPayment() {
    //set values
    const [studentId, setStudentId] = useState('');
    const [grade, setGrade] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [month, setMonth] = useState('');
    const [paidAmount, setAmount] = useState(0);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    //set subject list getting from DB
    const [subjectList, setSubjectList] = useState([]);
    //set selected subjects
    const [selectedSubjects, setSelectedSubjects] = useState([]);

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
                                    <input
                                        type='checkbox'
                                        value={sub.subjectAmount}
                                        onClick={(event) => handleCheckboxChange(event, sub)}
                                    />
                                    <label htmlFor={`subject-${sub._id}`}>{sub.subjectName}     {sub.subjectTeacherID}</label>
                                </div>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <label>
                            Date:
                            <input type="date" id="date" value={date} onChange={(event) => setDate(event.target.value)} />
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form >
                <div className='split-right'>
                    <button>Search by QR</button>
                    <button onClick={handleSearchClick}>See previous payments</button>
                </div>
            </div>
            <div className='split-right'>
                <div>
                    <h2>Search for Payment Details</h2>
                    <div>
                        {/* <label htmlFor="studentIdInput">Student ID:</label>
                        <input id="studentIdInput" type="text" value={studentId} onChange={handleStudentIdChange} />
                        <button onClick={handleSearchClick}>Search</button> */}
                    </div>
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
