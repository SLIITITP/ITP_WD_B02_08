import React, { useState } from 'react';
import axios from 'axios';

const IncomeSummary = () => {
    const [formData, setFormData] = useState({
        fromDate: '',
        toDate: ''
    });
    const [incomeData, setIncomeData] = useState(null);
    const [loading, setLoading] = useState(false);

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
        } catch (err) {
            console.error(err);
            setIncomeData(null);
            setLoading(false);
            alert(err.response.data.msg);
        }
    };

    const handleAllTimeIncome = async () => {
        setLoading(true);

        try {
            const res = await axios.get('/api/salary/all-time-income');
            setIncomeData(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setIncomeData(null);
            setLoading(false);
            alert(err.response.data.msg);
        }
    };


    return (
        <div className="h-full h-screen w-full flex items-center justify-center text-md font-medium text-gray-900 dark:text-white">
            <div className="w-1/2 bg-gray-200 p-4 pt-2 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Income Summary</h1>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="flex items-center mb-4">
                        <label htmlFor="fromDate" className="mr-4 font-bold">From Date:</label>
                        <input type="date" id="fromDate" name="fromDate" value={fromDate} onChange={handleChange} required className="border border-gray-300 rounded py-2 px-3 w-64" />
                    </div>
                    <div className="flex items-center mb-4">
                        <label htmlFor="toDate" className="mr-4 font-bold">To Date:</label>
                        <input type="date" id="toDate" name="toDate" value={toDate} onChange={handleChange} required className="border border-gray-300 rounded py-2 px-3 w-64" />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </form>
                <button onClick={handleAllTimeIncome} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">View All-Time Income</button>
                {loading && <p className="mt-4">Loading...</p>}
            </div>
            <div className="w-1/2 bg-gray-200 p-4 pt-2 flex flex-col items-center justify-center">
                {incomeData && (
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold mb-2">Income Details</h2>
                        <p className="font-bold">Net Total: {incomeData.netTotal}</p>
                        <p className="font-bold">Owners Commission: {incomeData.ownersCommission}</p>
                        <p className="font-bold">Other Charges: {incomeData.otherChargesSum}</p>
                        <p className="font-bold">Teachers Salaries: {incomeData.teacherIncome}</p>
                    </div>
                )}
            </div>
        </div>
    );

};

export default IncomeSummary;
