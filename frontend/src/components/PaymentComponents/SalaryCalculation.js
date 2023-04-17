import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

function SalaryCalculation() {
    const [subject, setSubject] = useState('');
    const [subjectID, setSubjectID] = useState('');
    const [grade, setGrade] = useState('');
    const [month, setMonth] = useState('');
    const [payments, setPayments] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
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

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api/payment/payHistory', {
                params: {
                    subjectID,
                    subject,
                    grade,
                    month,
                },
            });

            const payments = response.data.filter(payment => payment.subjectsIDs.includes(subjectID));
            setPayments(payments);

            // const total = payments.reduce((acc, curr) => acc + curr.subjectAmount, 0);
            // setTotalAmount(total);

            const subjectData = await axios.get(`http://localhost:9090/api/subject/amount/${subjectID}`);
            const subjectAmount = subjectData.data.subjectAmount || 0;
            const totalSubjectAmount = payments.length * subjectAmount;
            setTotalAmount(totalSubjectAmount);
            console.log('Total amount for the selected subject:', totalSubjectAmount);

        } catch (error) {
            console.log(error);
        }
    };

    const grades = ['5', '6', '7', '8', '9', '10', '11', '13'];
    const months = moment.months();

    const formatDate = (date) => {
        return moment(date).format('MMM DD, YYYY');
    };

    console.log(subjectID)
    return (
        <div>
            {/* Subject selection */}
            <div>
                <label htmlFor="subject">Subject:</label>
                <select
                    id="subject"
                    value={subject._id}
                    onChange={(e) => {
                        const selectedSubject = subjectList.find(
                            (sub) => sub.subjectName === e.target.value
                        );
                        setSubject(selectedSubject.subjectName);
                        setSubjectID(selectedSubject._id);
                    }}
                >
                    <option value="">Select Subject</option>
                    {subjectList.map((sub) => (
                        <option key={sub._id} value={sub.subjectName}>
                            {sub.subjectName} {sub.subjectTeacherName}
                        </option>
                    ))}
                </select>
            </div>

            {/* Grade selection */}
            <div>
                <label htmlFor="grade">Grade:</label>
                <select
                    id="grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                >
                    <option value="">Select a grade</option>
                    {grades.map((grade) => (
                        <option key={grade} value={grade}>
                            {grade}
                        </option>
                    ))}
                </select>
            </div>

            {/* Month selection */}
            <div>
                <label htmlFor="month">Month:</label>
                <select
                    id="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                >
                    <option value="">Select a month</option>
                    {months.map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            {/* Search button */}
            <button onClick={handleSearch}>Search</button>

            {/* Total amount */}
            <div>
                <p>Total amount: {totalAmount}</p>
            </div>

            {/* Payment history table */}
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Student ID</th>
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment._id}>
                            <td>{formatDate(payment.date)}</td>
                            <td>{payment.studentId}</td>
                            <td>{payment.subjects.join(", ")}</td>
                            <td>{payment.grade}</td>
                            <td>{payment.paidAmount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalaryCalculation;