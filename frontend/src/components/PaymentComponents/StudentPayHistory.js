import { useState, useEffect } from 'react';
import React from 'react'
import { getProfile } from '../../apicalls/helper';

export default function NipTest() {

    //getting user details from login
    useEffect(() => {
        let usernameFrom = localStorage.getItem("userName");
        console.log(usernameFrom);
        getProfile(usernameFrom).then((results) => {
            setApiData1(results.data);
            console.log(results.data._id);
        });
    }, []);

    const [apiData1, setApiData1] = useState({});
    const stdID = apiData1?._id;
    const studentID = apiData1?.studentId;
    const studentId = studentID;

    //Payment history fetching
    const [payments, setPayments] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

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

    return (
        <div className="h-screen w-full flex text-lg font-medium text-gray-900 dark:text-white">
            <div className="flex justify-center items-start h-screen w-full bg-gray-300 mt-2 p-4 pt-2">
                <div className='mt-4'>
                    <h4 className='flex justify-center items-start mb-2'>Payment History for Student ID {studentId}</h4>
                    {errorMessage && <p>{errorMessage}</p>}
                    {payments.length > 0 ? (
                        <table className="border border-black p-1">
                            <thead className="border border-black p-1 text-center">
                                <tr>
                                    <th className="border border-black p-1">Date</th>
                                    <th className="border border-black p-1">Month</th>
                                    <th className="border border-black p-1">Subjects</th>
                                    <th className="border border-black p-1">Grade</th>
                                    <th className="border border-black p-1">Paid Amount</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {payments.map((payment) => (
                                    <tr key={payment._id}>
                                        <td className="border border-black p-1">{payment.date}</td>
                                        <td className="border border-black p-1 text-lg text-green-500">{payment.month}</td>
                                        <td className="border border-black p-1">{payment.subjects.join(", ")}</td>
                                        <td className="border border-black p-1">{payment.grade}</td>
                                        <td className="border border-black p-1">{payment.paidAmount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No payment history found for student ID {studentId}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
