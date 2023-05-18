import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const IncomeSummary = () => {

    const [formData, setFormData] = useState({
        fromDate: '',
        toDate: ''
    });
    const [incomeData, setIncomeData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalPaidAmount, setTotalPaidAmount] = useState(null);
    const [showIncomeDetails, setShowIncomeDetails] = useState(false);

    const { fromDate, toDate } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.get(`/api/salary/income-summary?fromDate=${fromDate}&toDate=${toDate}`);
            setIncomeData(res.data);
            setLoading(false);
            setShowIncomeDetails(true);
            toast.success(res.data.msg);
        } catch (err) {
            console.error(err);
            setIncomeData(null);
            setLoading(false);
            toast.error(err.response.data.msg);
        }
    };

    const handleAllTimeIncome = async () => {
        setLoading(true);

        try {
            const res = await axios.get('/api/salary/all-time-income');
            setIncomeData(res.data);
            setLoading(false);
            setShowIncomeDetails(true);
        } catch (err) {
            console.error(err);
            setIncomeData(null);
            setLoading(false);
            alert(err.response.data.msg);
        }
    };

    const handleAllPaidAmount = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('/api/payment/income-payments', {
                params: {
                    fromDate,
                    toDate
                }
            });

            setTotalPaidAmount(response.data);
            setShowIncomeDetails(false);

        } catch (error) {
            console.error(error);
            toast.error(error.response.data.msg);
        }
    };

    return (
        <div className="h-full h-screen w-full flex items-center justify-center text-md font-medium text-gray-900 dark:text-white">
            <div className="w-1/2 h-full bg-gray-200 p-4 pt-2 flex flex-col items-center justify-start">
                <h1 className="text-3xl font-bold mb-4">Income Summary</h1>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <label htmlFor="fromDate" className="font-bold">From Date:</label>
                        <input type="date" id="fromDate" name="fromDate" value={fromDate} onChange={handleChange} className="border border-gray-300 rounded py-2 px-3 w-64 text-right" />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <label htmlFor="toDate" className="font-bold">To Date:</label>
                        <input type="date" id="toDate" name="toDate" value={toDate} onChange={handleChange} className="border border-gray-300 rounded py-2 px-3 w-64 text-right" />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                    </div>
                </form>
                <button onClick={handleAllTimeIncome} className="bg-gray-500 hover:bg-gray-700 text-white font-bold mb-2 py-2 px-4 rounded">View All-Time Income</button>
                <button onClick={handleAllPaidAmount} className="bg-green-500 hover:bg-green-700 text-white font-bold mb-2 py-2 px-4 rounded">View Student Paid Amounts</button>
                {loading && <p className="mt-4">Loading...</p>}
            </div>
            <div className="w-1/2 h-full bg-gray-200 p-4 pt-2 flex flex-col items-center justify-start">
            <label className="font-bold  mt-10">Details</label>
                {showIncomeDetails && incomeData && (
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold mb-2">Income Details</h2>
                        <p className="font-bold">All Total: {incomeData.allTotal}</p>
                        <p className="font-bold">Owners Commission: {incomeData.ownersCommission}</p>
                        <p className="font-bold">Other Charges: {incomeData.otherChargesSum}</p>
                        <p className="font-bold">Teachers Salaries: {incomeData.teacherIncome}</p>
                    </div>
                )}
                {!showIncomeDetails && totalPaidAmount !== null && (
                    <div className="mt-4">
                        <p className="font-bold">Total Paid Amount: {totalPaidAmount.totalPaidAmount} ({totalPaidAmount.calculationType})</p>
                    </div>
                )}
            </div>

            <ToastContainer />
        </div>
    );

};

export default IncomeSummary;
