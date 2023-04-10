import { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/Payment.css'

//added comment
export default function OnlinePayment() {
    const [studentID, setStudentID] = useState('')
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

    //Payment history fetching
    const [payments, setPayments] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const studentId = 'EM12345';

    useEffect(() => {
        fetch(`http://localhost:9090/api/payment/history/${studentId}`)
            .then(response => response.json())
            .then(data => {
                setPayments(data);
            })
            .catch(error => {
                console.error(error);
                setErrorMessage('Error fetching payment history');
            });
    }, [studentId]);

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


    return (
        <div className='container'>
            <div className='split-left'>
                <form onSubmit={handleSubmit}>
                    <div className='get-center'>
                        <h3>Hello, You are ready to pay your class fess</h3>
                        <div>
                            <label>
                                Student ID :
                                <input
                                    type='text'
                                    value={studentId}
                                    readOnly />
                            </label>
                            <label>
                                Amount:
                                <input type="number" value={totalAmount} readOnly />
                            </label>
                        </div>
                        <div>
                            <label>
                                Grade :
                                <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                                    <option value=''>--Select Grade--</option>
                                    <option value='1'>Grade 1</option>
                                    <option value='2'>Grade 2</option>
                                    <option value='3'>Grade 3</option>
                                    <option value='4'>Grade 4</option>
                                    <option value='5'>Grade 5</option>
                                    <option value='6'>Grade 6</option>
                                    <option value='7'>Grade 7</option>
                                    <option value='8'>Grade 8</option>
                                    <option value='9'>Grade 9</option>
                                    <option value='10'>Grade 10</option>
                                    <option value='11'>Grade 11</option>
                                </select>
                            </label>
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
                    </div>
                    <div>
                        Select Classes to pay
                        <ul>
                            {subjectList.map((sub) => (
                                <div key={sub._id}>
                                    <label htmlFor={`subject-${sub._id}`}>
                                        <input
                                            type='checkbox'
                                            id={`subject-${sub._id}`}
                                            value={sub.subjectAmount}
                                            checked={sub.checked}
                                            onChange={(event) => handleCheckboxChange(event, sub)} />
                                        {sub.subjectName} {sub.subjectTeacherID}
                                    </label>
                                </div>
                            ))}
                        </ul>
                    </div>
                    <button type="submit">Pay</button>
                </form>
            </div>
            <div className='split-right'>
                <div>
                    <h4>Payment History for Student ID {studentId}</h4>
                    {errorMessage && <p>{errorMessage}</p>}
                    {payments.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Month</th>
                                    <th>Subjects</th>
                                    <th>Grade</th>
                                    <th>Paid Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map(payment => (
                                    <tr key={payment._id}>
                                        <td>{payment.date}</td>
                                        <td>{payment.month}</td>
                                        <td>{payment.subjects.join(', ')}</td>
                                        <td>{payment.grade}</td>
                                        <td>{payment.paidAmount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No payment history found for student ID {studentId}</p>
                    )}
                </div>
            </div>
        </div >
    )
}
