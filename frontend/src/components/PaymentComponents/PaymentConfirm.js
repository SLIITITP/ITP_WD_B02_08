import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../../stylesheets/Payment.css'

export default function PaymentConfirm() {

    const location = useLocation();
    const navigate = useNavigate();

    //download recipet impementing
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

        // // Define the table columns
        // const columns = ['Grade', 'Month', 'Subject', 'Subject Amount', 'Student Count', 'Total'];

        // // Define the table rows
        // const rows = salarydata.map((item) => [
        //     item.grade,
        //     item.month,
        //     item.subject,
        //     item.subjectAmount,
        //     item.paymentCount,
        //     item.subjectAmount * item.paymentCount,
        // ]);

        // Set the font size and style for the table header
        doc.setFontSize(20);
        doc.setFont("courier", "bold");

        // Draw the table content
        doc.text('Payment Confirmation', 14, 20);

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");

        doc.text(`Student ID : ${location.state.studentId}`, 14, 30)

        doc.setFont("helvetica", "normal");
        doc.text(`Payment Date : ${location.state.date}`, 100, 30)
        doc.text(`Grade : ${location.state.grade}`, 14, 37)
        doc.text(`Month : ${location.state.month}`, 14, 44)
        doc.text(`Total Amount : ${location.state.paidAmount}`, 14,51)
        doc.text(`Paid Subjects : ${location.state.subjects.join(', ')}`, 14, 58)
        doc.text(`Payment ID : ${location.state.paymentID}`, 14, 65)

        // doc.autoTable({
        //     startY: 64,
        //     head: [columns],
        //     body: rows,
        // });

        // Save the PDF file with the name
        doc.save(`EIMS ${location.state.studentId} ${location.state.paymentID}.pdf`);
    };


    return (
        <div className="h-screen h-full  w-full flex text-lg font-medium text-gray-900 dark:text-white">
            <div className='flex justify-center items-center h-screen w-full bg-gray-300 p-4 pt-2'>

                <div className='get-center'>
                    <h2 className='text-3xl font-bold text-center text-blue-900 tracking-tight p-2'>Payment Confirmation</h2>
                    <hr />
                    <div>
                        <p className='font-bold text-green-500 p-2'>
                            Your Payment has recieved
                        </p>
                        <label ref={componentRef} className='pb-3'>
                            Student ID : {location.state.studentId}<br />
                            Student Grade : {location.state.grade}<br />
                            Payment Date : {location.state.date}<br />
                            Month : {location.state.month}<br />
                            Total Amount : {location.state.paidAmount}<br />
                            Paid Subjects : {location.state.subjects.join(', ')}<br />
                            Payment ID : {location.state.paymentID}<br />
                        </label>
                        <hr />
                        <button
                            onClick={() => navigate('/')}
                            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3'>
                            Go to Home
                        </button>
                        <br />
                        <ReactToPrint
                            // trigger={() => <button>Print</button>}
                            content={() => componentRef.current}
                        />
                        <button
                            onClick={handleDownload}
                            className='text-white bg-teal-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3'>
                            Download Payment Reciept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
