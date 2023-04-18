import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';

export default function SalaryCalculation() {
    const [subject, setSubject] = useState('');
    const [subjectID, setSubjectID] = useState('');
    const [grade, setGrade] = useState('');
    const [month, setMonth] = useState('');
    const [payments, setPayments] = useState([]);
    const [tAmount, settAmount] = useState(0);
    const [subjectList, setSubjectList] = useState([]);
    const [teacherName, setTeacherName] = useState('');
    const [paymentCount, setPaymentCount] = useState(0);
    const [subjectAmount, setSubjectAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);


    const now = new Date();
    const ldate = now.toLocaleDateString('en-CA');
    const ltime = now.toLocaleTimeString('en-US', { hour12: false });
    const [date, setDate] = useState(`${ldate}T${ltime}`);

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

            const subjectData = await axios.get(`http://localhost:9090/api/subject/amount/${subjectID}`);
            const subjectAmount = subjectData.data.subjectAmount || 0;
            const totalSubjectAmount = payments.length * subjectAmount;
            setSubjectAmount(subjectAmount);
            setPaymentCount(payments.length);
            settAmount(totalSubjectAmount);
            console.log('Total amount for the selected subject:', totalSubjectAmount);

        } catch (error) {
            console.log(error);
        }
    };

    const grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', 'Other'];
    const months = moment.months();

    const formatDate = (date) => {
        return moment(date).format('MMM DD, YYYY');
    };

    //store data to a varibale for total salary
    const [salarydata, setsalaryData] = useState([]);
    const handleSalaryData = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Store the data in state
        setsalaryData([...salarydata, { teacherName, subjectAmount, month, grade, subject, paymentCount }]);
        setTotalAmount(totalAmount + (subjectAmount * paymentCount)); // Calculate the new total amount
    };
    //clear added table by row
    const handleClearData = (index) => {
        const subjectAmount = salarydata[index].subjectAmount;
        const paymentCount = salarydata[index].paymentCount;

        setsalaryData([...salarydata.slice(0, index), ...salarydata.slice(index + 1)]); // Remove the salarydata at the specified index
        setTotalAmount(totalAmount - subjectAmount * paymentCount); // Subtract the amount of the cleared salarydata from the total
    };

    //commsion and net total calculation
    const [commissionPercentage, setCommissionPercentage] = useState(0);
    const [otherCharges, setOtherCharges] = useState(0);
    const [otherChargesNote, setOtherChargesNote] = useState("");

    // Calculate the commission amount based on the total amount and the percentage value
    const commissionAmount = totalAmount * (commissionPercentage / 100);
    const netTotal = totalAmount - commissionAmount - otherCharges;

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
        const columns = ['Grade', 'Month', 'Subject', 'Subject Amount', 'Student Count', 'Total'];

        // Define the table rows
        const rows = salarydata.map((item) => [
            item.grade,
            item.month,
            item.subject,
            item.subjectAmount,
            item.paymentCount,
            item.subjectAmount * item.paymentCount,
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
        doc.save(`Thilina Ins Salary.pdf`);
    };

    //adding to DB
    const [formData, setFormData] = useState({
        teacherID: '',
        teacherName: '',
        date: '',
        netTotal: 0,
        commissionPercentage: 0,
        total: 0,
        otherCharges: 0,
        otherChargesNote: '',
        salaryData: [],
    });

    useEffect(() => {
        setFormData({
            teacherID: '',
            teacherName: teacherName,
            date: date,
            netTotal: netTotal,
            commissionPercentage: commissionPercentage,
            total: totalAmount,
            otherCharges: otherCharges,
            otherChargesNote: otherChargesNote,
            salaryData: salarydata,
        });
    }, [subject, subjectID, grade, month, payments, tAmount, subjectList, teacherName, paymentCount, subjectAmount, totalAmount]);



    const handleBillSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:9090/api/salary/teacherSalary', formData);
            alert('Teacher salary data added successfully');
        } catch (err) {
            console.error(err);
            alert('Error adding teacher salary data');
        }
        console.log(formData)
        console.log(otherCharges)
    };

    return (
        <div className="h-screen h-full  w-full flex text-md font-medium text-gray-900 dark:text-white">
            <div className='w-1/2 bg-gray-300 p-4 pt-2'>
                {/* Subject selection */}
                <div className='mb-2 flex items-center'>
                    <label htmlFor="subject" className='mr-2 mb-2 text-md font-medium text-gray-900 dark:text-white w-20'>Subject:</label>
                    <select
                        id="subject"
                        value={subject._id}
                        onChange={(e) => {
                            const selectedSubject = subjectList.find(
                                (sub) => sub._id === e.target.value
                            );
                            //console.log(selectedSubject)
                            setSubject(selectedSubject.subjectName);
                            setSubjectID(selectedSubject._id);
                            setTeacherName(selectedSubject.subjectTeacherName)
                        }}
                        className='mt-1 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:mt-1 shadow-sm-light'
                    >
                        <option value="">Select Subject</option>
                        {subjectList.map((sub) => (
                            <option key={sub._id} value={sub._id}>
                                {sub.subjectName} {sub.subjectTeacherName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Grade selection */}
                <div className='mb-2 flex items-center'>
                    <label htmlFor="grade" className='mr-2 mb-2 text-md font-medium text-gray-900 dark:text-white w-20'>Grade:</label>
                    <select
                        id="grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className='mt-1 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:mt-1 shadow-sm-light'
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
                <div className='mb-2 flex items-center'>
                    <label htmlFor="month" className='mr-2 mb-2 text-md font-medium text-gray-900 dark:text-white w-20'>Month:</label>
                    <select
                        id="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className='mt-1 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:mt-1 shadow-sm-light'
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
                <button onClick={handleSearch} className='mr-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md p-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Search</button>
                <button onClick={handleSalaryData} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Add</button>

                {/* Total amount */}
                <div className='mr-2 mb-2 pt-2 text-md font-medium text-gray-900 dark:text-white w-full'>
                    <p className='mt-1 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:mt-1 shadow-sm-light'
                    >Total amount: {tAmount}</p>
                </div>

                {/* Payment history table */}
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className='border border-black p-1'>Date</th>
                            <th className='border border-black p-1'>Student ID</th>
                            <th className='border border-black p-1'>Subject</th>
                            <th className='border border-black p-1'>Grade</th>
                            <th className='border border-black p-1'>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment._id} className='border border-black p-1'>
                                <td className='border border-black p-1'>{formatDate(payment.date)}</td>
                                <td className='border border-black p-1'>{payment.studentId}</td>
                                <td className='border border-black p-1'>{payment.subjects.join(", ")}</td>
                                <td className='border border-black p-1'>{payment.grade}</td>
                                <td className='border border-black p-1'>{payment.paidAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='w-1/2 bg-gray-200 p-4'>
                <div className='flex flex-wrap -mx-3 mb-2 p-2 text-md font-semibold'>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                            Date:</label>
                        <input
                            type="datetime-local"
                            id="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            required
                            className='appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label htmlFor="commissionPercentage" className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Commission Percentage:</label>
                        <input
                            type="number"
                            id="commissionPercentage"
                            name="commissionPercentage"
                            value={commissionPercentage}
                            onChange={(e) => setCommissionPercentage(parseFloat(e.target.value))}
                            required
                            className='appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        />
                    </div>
                </div>
                <div className='flex flex-wrap -mx-3 mb-2 p-2 text-md font-semibold'>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label htmlFor="otherCharges" className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Other Charges:</label>
                        <input
                            type="number"
                            id="otherCharges"
                            name="otherCharges"
                            value={otherCharges}
                            onChange={(e) => setOtherCharges(parseFloat(e.target.value))}
                            className='appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label htmlFor="otherChargesNote" className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Other Charges Note : </label>
                        <input
                            type="text"
                            id="otherChargesNote"
                            name="otherChargesNote"
                            value={otherChargesNote}
                            onChange={(e) => setOtherChargesNote(e.target.value)}
                            className='appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        />
                    </div>
                </div>
                <table ref={componentRef} className='auto-table'>
                    <thead>
                        <tr>
                            <th className='border border-black p-1'>Grade</th>
                            <th className='border border-black p-1'>Month</th>
                            <th className='border border-black p-1'>Subject</th>
                            <th className='border border-black p-1'>Teacher Name</th>
                            <th className='border border-black p-1'>Subject Amount</th>
                            <th className='border border-black p-1'>Payment Count</th>
                            <th className='border border-black p-1'>Options</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {salarydata.map((item, index) => (
                            <tr key={index} className='border border-black p-1'>
                                <td className='border border-black p-1'>{item.grade}</td>
                                <td className='border border-black p-1'>{item.month}</td>
                                <td className='border border-black p-1'>{item.subject}</td>
                                <td className='border border-black p-1'>{item.teacherName}</td>
                                <td className='border border-black p-1'>{item.subjectAmount}</td>
                                <td className='border border-black p-1'>{item.paymentCount}</td>
                                <td className='border border-black p-1'>
                                    <button
                                        onClick={() => handleClearData(index)}
                                        className='bg-transparent text-red-600 font-semibold border border-red-600 rounded hover:bg-red-600 hover:text-red-900'
                                    >Clear</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="w-full px-3 mt-2 mb-2 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-900 text-sm font-bold mb-2">Total = {totalAmount}</label>
                </div>
                <div className="w-full px-3 mt-2 mb-2 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-900 text-sm font-bold mb-2">Commission Amount = {commissionAmount}</label>
                </div>
                <div className="w-full px-3 mt-2 mb-2 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-900 text-sm font-bold mb-2">Other Charges = {otherCharges} ({otherChargesNote})</label>
                </div>
                <div className="w-full px-3 mt-2 mb-2 md:mb-0">
                    <label className="underline border-b-2 border-black  uppercase tracking-wide text-gray-900 text-lg font-bold mb-2">Net Total = {netTotal}</label>
                </div>

                <ReactToPrint
                    // trigger={() => <button>Print</button>}
                    content={() => componentRef.current}
                />
                <div className='flex flex-wrap -mx-3 mb-2 p-2 text-md font-semibold'>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <button onClick={(e) => {
                            if (window.confirm("Are you sure you want to confirm?")) {
                                handleBillSubmit(e);
                            }
                        }}
                            className='w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                        >CONFIRM</button>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <button onClick={handleDownload} className='w-full text-black bg-amber-500 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Download Receipt</button>
                    </div>

                </div>
            </div>
        </div>
    );
}    