import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../stylesheets/Payment.css'
import { Link, useNavigate } from 'react-router-dom';
import PaymentCheckout from './PaymentCheckout';


//added comment
export default function OnlinePayment() {
    const [studentID, setStudentID] = useState('')
    const [grade, setGrade] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [month, setMonth] = useState('');
    const [paidAmount, setAmount] = useState(0);

    const now = new Date();
    const ldate = now.toLocaleDateString('en-CA');
    const ltime = now.toLocaleTimeString('en-US', { hour12: false });
    const [date, setDate] = useState(`${ldate}T${ltime}`);

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

        //logic for checkbox required
        const isChecked = event.target.checked;
        sub.checked = isChecked;
        setSubjectList([...subjectList]);
        if (isChecked) {
            setNumChecked(numChecked + 1);
        } else {
            setNumChecked(numChecked - 1);
        }
    };

    //checkbox required logic
    const [numChecked, setNumChecked] = useState(0);
    const [submitted, setSubmitted] = useState(false);


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

    const subjectsIDs = [...selectedSubjects];

    //handleSubmit for pass data to checkout page
    const navigate = useNavigate();

    const handleSubmit = () => {
        setSubmitted(true);
        navigate('/payment/checkout', {
            state: {
                sId: studentId,
                sGrade: grade,
                sSubjects: subjects,
                sMonth: month,
                sPaidAmount: paidAmount,
                sDate: date,
                sSubIDs: subjectsIDs,
            }

        });
    }


    return (
        <div className="h-screen h-full  w-full flex text-md font-medium text-gray-900 dark:text-white">
            <div className='w-2/3 bg-gray-300 p-4 pt-2'>
                <>
                    <h3 className='text-3xl font-bold text-center text-blue-900 tracking-tight p-2'>Hello, You are ready to pay your class fees</h3>
                    <form onSubmit={() => { handleSubmit() }} className='center p-1 pt-2'>
                        <div className='flex flex-wrap -mx-3 mb-2 p-2 text-md font-semibold'>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                                    Student ID :
                                </label>
                                <input
                                    type='text'
                                    value={studentId}
                                    readOnly
                                    className='appearance-none block w-full bg-gray-50 text-lg text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                                    Amount:
                                </label>
                                <input type="number"
                                    value={totalAmount}
                                    readOnly
                                    className='appearance-none block w-full bg-gray-50 text-lg text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                                    Grade :
                                </label>
                                <select value={grade} onChange={(e) => setGrade(e.target.value)} required className='appearance-none block w-full bg-gray-50 text-lg text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
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
                                    <option value='Other'>Other</option>
                                </select>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                                    Month:
                                </label>
                                <select value={month} onChange={(e) => setMonth(e.target.value)} required className='appearance-none block w-full bg-gray-50 text-lg text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
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
                            </div>
                            <div className='w-full px-3 mb-6 md:mb-0 mt-3'>
                                <p className='appearance-none block w-full bg-gray-50 text-lg text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>{subjects.join(', ')}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 p-2 mt-2 bg-purple-600 rounded">
                            {subjectList.map((sub) => (
                                <div key={sub._id} className='bg-gray-200 rounded'>
                                    <label htmlFor={`subject-${sub._id}`} className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                        <input
                                            type='checkbox'
                                            id={`subject-${sub._id}`}
                                            value={sub.subjectAmount}
                                            checked={sub.checked}
                                            onChange={(event) => handleCheckboxChange(event, sub)}
                                            className='w-4 h-4 mr-1 ml-1 border-2 border-black-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                                        />
                                        {sub.subjectName} | {sub.subjectTeacherName}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <button type="submit" disabled={numChecked === 0} className='disabled:bg-gray-400 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full mt-3'>PROCEED TO CHECKOUT</button>
                        {submitted && numChecked === 0 && (
                            <p className="text-red-500">Please select at least one checkbox.</p>
                        )}
                    </form>
                </>
            </div >
            <div className='w-1/3 bg-gray-200 p-4 pt-2'>
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
