import React, { useState } from 'react';
import axios from 'axios';

const PaymentHistory = () => {
    const [studentId, setStudentId] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCheckPayment = async () => {
        setLoading(true);
        try {
            const currentDate = new Date();
            const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
            console.log(currentMonth);
            const response = await axios.get('/api/payment/payHistory', {
                params: {
                    studentId: studentId,
                    subject: subjectName,
                    month: currentMonth,
                },
            });
            const payments = response.data;
            console.log(payments)
            setIsPaid(payments.length > 0);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Payment History</h2>
            <div className="mb-4">
                <label htmlFor="studentId" className="mr-2">
                    Student ID:
                </label>
                <input
                    type="text"
                    id="studentId"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="border border-gray-300 px-2 py-1 rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="subjectName" className="mr-2">
                    Subject Name:
                </label>
                <input
                    type="text"
                    id="subjectName"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    className="border border-gray-300 px-2 py-1 rounded"
                />
            </div>
            <button
                onClick={handleCheckPayment}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
                Check Payment
            </button>
            {loading && <p className="mt-4">Loading...</p>}
            {isPaid ? (
                <p className="mt-4 text-green-500">Payment has been made for the subject in the current month.</p>
            ) : (
                <p className="mt-4 text-red-500">No payment found for the subject in the current month.</p>
            )}
        </div>
    );
};

export default PaymentHistory;
