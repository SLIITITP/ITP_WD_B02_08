import { useState, useEffect } from 'react';
import { getSubjects } from './api'; // assume there's an API function to retrieve subject data from MongoDB
import axios from 'axios';

function AddPayment() {
    const [studentId, setStudentId] = useState('');
    const [grade, setGrade] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [month, setMonth] = useState('');
    const [paidAmount, setAmount] = useState(0);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [subjectsList, setSubjectsList] = useState([]);
    const [fees, setFees] = useState({});

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/subject/subjects');
                setSubjectsList(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSubjects();
    }, []);


    const handleCheckboxChange = (event) => {
        const { value } = event.target;
        if (subjects.includes(value)) {
            setSubjects(subjects.filter((subject) => subject !== value));
            setAmount(paidAmount - fees[value]);
        } else {
            setSubjects([...subjects, value]);
            setAmount(paidAmount + fees[value]);
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
                    {subjectsList.map((subject) => (
                        <label key={subject.subjectID}>
                            <input
                                type="checkbox"
                                value={subject.subjectName}
                                checked={subjects.includes(value)}
                                onChange={handleCheckboxChange}
                            />
                            {subject.subjectName}
                        </label>
                    ))}
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

export default AddPayment;
