import React, { useState } from 'react';
import axios from 'axios';

function GetPayment() {
    const [studentId, setStudentId] = useState('');
    const [grade, setGrade] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [month, setMonth] = useState('');
    const [paidAmount, setAmount] = useState(0);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

    const handleCheckboxChange = (event) => {
        const { value } = event.target;
        const subjectFees = { Math: 1200, Science: 1200, History: 1000, HGC: 1300 };
        if (subjects.includes(value)) {
            setSubjects(subjects.filter((subject) => subject !== value));
            setAmount(paidAmount - subjectFees[value]);
        } else {
            setSubjects([...subjects, value]);
            setAmount(paidAmount + subjectFees[value]);
        }
    };

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
            <h1>Student Payment Collecting</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Student ID:
                        <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Grade:
                        <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Month:
                        <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>Amount: </label>
                    <input type="number" value={paidAmount} readOnly />
                </div>
                <div>
                    <label>Subjects:</label>
                    <br />
                    <label>
                        <input type="checkbox" value="Math" checked={subjects.includes('Math')} onChange={handleCheckboxChange} />
                        Math
                    </label>
                    <label>
                        <input type="checkbox" value="HGC" checked={subjects.includes('HGC')} onChange={handleCheckboxChange} />
                        HGC
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" value="Science" checked={subjects.includes('Science')} onChange={handleCheckboxChange} />
                        Science
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" value="History" checked={subjects.includes('History')} onChange={handleCheckboxChange} />
                        History
                    </label>
                </div>
                <div>
                    <label>
                        Date:
                        <input type="date" id="date" value={date} onChange={(event) => setDate(event.target.value)} />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form >
        </div >
    );
}

export default GetPayment;
