import React, { useState, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function App() {
    const [data, setData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const componentRef = useRef();

    const handleData = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const subjectName = event.target.elements.subjectName.value;
        const amount = Number(event.target.elements.amount.value);
        const count = Number(event.target.elements.count.value);

        // Store the data in state
        setData([...data, { subjectName, amount, count }]);
        setTotalAmount(totalAmount + amount * count); // Calculate the new total amount

        // Clear input fields
        event.target.elements.subjectName.value = '';
        event.target.elements.amount.value = '';
        event.target.elements.count.value = '';
    };

    const handleClear = (index) => {
        const amount = data[index].amount;
        const count = data[index].count;

        setData([...data.slice(0, index), ...data.slice(index + 1)]); // Remove the data at the specified index
        setTotalAmount(totalAmount - amount * count); // Subtract the amount of the cleared data from the total
    };

    // const handleDownload = () => {
    //     // Create a new jsPDF instance
    //     const doc = new jsPDF();

    //     // Set the title of the PDF document
    //     doc.setProperties({
    //         title: 'THILINA INS SALARY',
    //         subject: 'Payment Slip',
    //         author: 'Thilina Institute',
    //         keywords: '',
    //         creator: 'Nipun'
    //     });

    //     // Define the table columns
    //     const columns = ['Subject Name', 'Amount', 'Count', 'Total Amount'];

    //     // Define the table rows
    //     const rows = data.map((item) => [
    //         item.subjectName,
    //         item.amount,
    //         item.count,
    //         item.amount * item.count,
    //     ]);

    //     const foot = totalAmount;

    //     // Set the font size and style for the table header
    //     // doc.setFontSize(12);
    //     // doc.set('bold');

    //     // Draw the table content
    //     doc.text('Salary Reciept', 14, 20);

    //     doc.autoTable({
    //         startY: 25,
    //         head: [columns],
    //         body: rows,
    //     });

    //     // Save the PDF file with the name "table-data.pdf"
    //     doc.save(`Thilina Ins Salary.pdf`);
    // };

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
        const columns = ['Subject Name', 'Amount', 'Count', 'Total Amount'];

        // Define the table rows
        const rows = data.map((item) => [
            item.subjectName,
            item.amount,
            item.count,
            item.amount * item.count,
        ]);

        const foot = totalAmount;

        // Set the font size and style for the table header
        doc.setFontSize(20);
        doc.setFont("arial", "bold");

        // Draw the table content
        doc.text('Salary Receipt', 14, 20);

        doc.setFontSize(12);
        doc.setFont("", "bold");
        doc.text(`Total Amount: ${foot}`, 14, 30)
        doc.text(`Commission: `, 14, 35)
        doc.text(`Net Amount: `, 14, 40)

        doc.autoTable({
            startY: 45,
            head: [columns],
            body: rows,
        });
        // Save the PDF file with the name
        doc.save(`Thilina Ins Salary.pdf`);
    };


    return (
        <div>
            <form onSubmit={handleData}>
                <label htmlFor="subjectName-input">Subject Name:</label>
                <input type="text" id="subjectName-input" name="subjectName" />

                <label htmlFor="amount-input">Amount:</label>
                <input type="number" id="amount-input" name="amount" />

                <label htmlFor="count-input">Count:</label>
                <input type="number" id="count-input" name="count" />

                <button type="submit">Submit</button>
            </form>

            <span class="relative">
                <span class="border-b-2">Double Underline Text</span>
            </span>

            <p>Total Amount: {totalAmount}</p>

            <table>
                <thead>
                    <tr>
                        <th>Subject Name</th>
                        <th>Amount</th>
                        <th>Count</th>
                        <th>Total Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.subjectName}</td>
                            <td>{item.amount}</td>
                            <td>{item.count}</td>
                            <td>{item.amount * item.count}</td>
                            <td>
                                <button onClick={() => handleClear(index)}>Clear</button>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>

            <ReactToPrint
                trigger={() => <button>Print</button>}
                content={() => componentRef.current}
            />

            <button onClick={handleDownload}>Download PDF</button>

            <div ref={componentRef}>
                <table>
                    <thead>
                        <tr>
                            <th>Subject Name</th>
                            <th>Amount</th>
                            <th>Count</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.subjectName}</td>
                                <td>{item.amount}</td>
                                <td>{item.count}</td>
                                <td>{item.amount * item.count}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Total Amount:</td>
                            <td>{totalAmount}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
