import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../stylesheets/Payment.css'
import ReactToPrint from 'react-to-print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';


function ViewPayment() {


    const [searchCriteria, setSearchCriteria] = useState({
        subject: '',
        subjectID: '',
        grade: '',
        month: '',
        studentId: '',
    });

    const [payments, setPayments] = useState([]);

    // Set default search criteria
    useEffect(() => {
        handleChange({
            target: {
                name: 'subject',
                value: '',
            },
        });
    }, []);


    const handleChange = async (event) => {
        const { name, value } = event.target;
        setSearchCriteria((prevState) => ({ ...prevState, [name]: value }));
        // console.log(value)
        // console.log(name)
        try {
            const res = await axios.get('http://localhost:9090/api/payment/payHistory', {
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
        setShowResults(true);
    };

    useEffect(() => {
        if (searchTerm === "") {
            setSearchCriteria(prevState => ({ ...prevState, studentId: "" }));
            setPayments([]);
        } else {
            axios.get(`http://localhost:9090/api/user/search/${searchTerm}`)
                .then((response) => {
                    setSearchResults(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [searchTerm]);


    const handleResultClick = async (studentId) => {
        setSearchTerm(studentId);
        setSearchCriteria((prevState) => ({ ...prevState, studentId: studentId }));
        try {
            const res = await axios.get('http://localhost:9090/api/payment/payHistory', {
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

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (!confirmDelete) {
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:9090/api/payment/delete/${id}`);
            console.log(response.data);
            setPayments(payments.filter(payment => payment._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', 'Other'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',];

    //pdf printing parts
    const componentRef = useRef();

    const handleDownload = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Set the title of the PDF document
        doc.setProperties({
            title: 'THILINA INS SALARY',
            subject: 'Payment Slip',
            author: 'Thilina Institute',
            keywords: '',
            creator: 'Nipun'
        });

        // Define the table columns
        const columns = ['Student ID', 'Paid Amount', 'Date', 'Month', 'Grade', 'Subjects'];

        // Define the table rows
        const rows = payments.map((payment) => [
            payment.studentId,
            payment.paidAmount,
            payment.date,
            payment.month,
            payment.grade,
            payment.subjects.join(", "),
        ]);

        // Set the font size and style for the table header
        doc.setFontSize(20);
        doc.setFont("courier", "bold");

        // Draw the table content
        doc.text('Salary Receipt', 14, 20);

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");

        doc.text(`Teacher Name: ${teacherName}`, 14, 30)
        doc.text(`Date: ${formatDate(date)} `, 150, 30)
        doc.text(`Total Net Amount: ${netTotal}`, 14, 37)

        doc.setFont("helvetica", "normal");
        doc.text(`Payment Month: ${month} `, 150, 37)
        doc.text(`Total Amount: ${totalAmount} `, 14, 44)
        doc.text(`Commission: ${commissionAmount} (${commissionPercentage}%)`, 14, 51)
        doc.text(`Other Charges: ${otherCharges} (${otherChargesNote})`, 14, 58)

        doc.autoTable({
            startY: 64,
            head: [columns],
            body: rows,
        });
        // Save the PDF file with the name
        doc.save(`EIMS ${teacherName} ${formatDate(date)}.pdf`);
    };

    return (
        <div className="flex flex-wrap -mx-3 mb-2 p-3 text-md font-semibold" >
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Select Subject:
                </label>
                <select
                    name="subjectID"
                    onChange={handleChange}
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                >
                    <option value="">Select Subject</option>
                    {subjectList.map((sub) => (
                        <option key={sub.subjectID} value={sub._id}>
                            {sub.subjectName} {sub.subjectTeacherName}
                        </option>
                    ))}
                </select>
            </div>
            <div className='w-full md:w-1/4 px-3 mb-6 md:mb-0'>
                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Grade:
                </label>
                <div className="relative">
                    <select
                        name="grade"
                        value={searchCriteria.grade}
                        className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        onChange={handleChange}
                    >
                        <option value="">Select a grade</option>
                        {grades.map((grade) => (
                            <option key={grade} value={grade}>
                                {grade}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Month:
                </label>
                <div className="relative">
                    <select
                        name="month"
                        value={searchCriteria.month}
                        className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        onChange={handleChange}
                    >
                        <option value="">Select a month</option>
                        {months.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Search :
                </label>
                <div ref={searchBoxRef} className="search-box " onClick={() => setShowResults(true)}>
                    <input
                        type="text"
                        placeholder="Search by ID or Name"
                        value={searchTerm}
                        onChange={handleInputChange}
                        className='border-none block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    />
                    {showResults && searchTerm && (
                        <ul className="search-results">
                            {searchResults.map((result) => (
                                <li
                                    key={result._id}
                                    onClick={() => handleResultClick(result.studentID)}
                                >
                                    {result.studentID} - {result.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div>
                <ReactToPrint
                    // trigger={() => <button>Print</button>}
                    content={() => componentRef.current}
                />
                <button onClick={handleDownload} className='w-full text-white bg-teal-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Download Receipt</button>
            </div>
            <div className='p-2'>
                <table  ref={componentRef} className="table-auto" >
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Student ID</th>
                            <th className="px-4 py-2">Paid Amount</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Month</th>
                            <th className="px-4 py-2">Grade</th>
                            <th className="px-4 py-2">Subjects</th>
                            <th className="px-4 py-2">Options</th>
                        </tr>
                    </thead>
                    <tbody className='text-black-900 text-md'>
                        {payments.map((payment) => (
                            <tr key={payment._id}>
                                <td className="border px-4 py-2">{payment.studentId}</td>
                                <td className="border px-4 py-2">{payment.paidAmount} <p className='inline-block text-green-500' title={payment.paymentID}>{payment.paymentID ? 'Online' : ''}</p></td>
                                <td className="border px-4 py-2">{payment.date}</td>
                                <td className="border px-4 py-2">{payment.month}</td>
                                <td className="border px-4 py-2">{payment.grade}</td>
                                <td className="border px-4 py-2 ">{payment.subjects.join(", ")} [{payment.subjectsIDs.length}]</td>
                                <td className="border px-4 py-2 text-red-600 font-semibold">
                                    <div>
                                        <button onClick={() => handleDelete(payment._id)} className="bg-transparent text-red-600 font-semibold border border-red-600 rounded hover:bg-red-600 hover:text-red-900">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >


    );
}

export default ViewPayment;
