//teacher salary list

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

function SalaryHistory() {
  const [teacherSalaries, setTeacherSalaries] = useState([]);

  useEffect(() => {
    async function fetchTeacherSalaries() {
      const response = await axios.get('/api/salary/teachersalary');
      setTeacherSalaries(response.data);
    }
    fetchTeacherSalaries();
  }, []);

  const formatDate = (date) => {
    return moment(date).format('MMM DD, YYYY');
  };

  return (
    <div className="auto-table w-full p-2 border border-collapse border-green-600 rounded">
      <table className='w-full'>
        <thead>
          <tr className="text-center bg-gray-700 text-white">
            <th className="border border-green-600 p-2">Teacher Name</th>
            <th className="border border-green-600 p-2">Date</th>
            <th className="border border-green-600 p-2">Net Total</th>
            <th className="border border-green-600 p-2">Comm. (%)</th>
            <th className="border border-green-600 p-2">Total</th>
            <th className="border border-green-600 p-2">Other Charges</th>
            <th className="border border-green-600 p-2">OC Note</th>
            <th className="border border-green-600 p-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {teacherSalaries.map((teacherSalary) => (
            <tr key={teacherSalary._id}>
              <td className="border border-3 border-green-600 p-2">{teacherSalary.teacherName}</td>
              <td className="border border-3 border-green-600 p-2">{formatDate(teacherSalary.date)}</td>
              <td className="border border-3 border-green-600 p-2">{teacherSalary.netTotal}</td>
              <td className="border border-3 border-green-600 p-2">{teacherSalary.commissionPercentage}</td>
              <td className="border border-3 border-green-600 p-2">{teacherSalary.total}</td>
              <td className="border border-3 border-green-600 p-2">{teacherSalary.otherCharges}</td>
              <td className="border border-3 border-green-600 p-2">{teacherSalary.otherChargesNote}</td>
              <td className="border border-3 border-green-600 p-2">
                <table className='w-full'>
                  <thead>
                    <tr className='text-center'>
                      <th className="border border-green-600 p-2">Grade</th>
                      <th className="border border-green-600 p-2">Month</th>
                      <th className="border border-green-600 p-2">Subject</th>
                      <th className="border border-green-600 p-2">Subject Amount</th>
                      <th className="border border-green-600 p-2">Payment Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teacherSalary.salaryData.map((salary) => (
                      <tr key={salary._id} className='text-center'>
                        <td className="border border-green-600">{salary.grade}</td>
                        <td className="border border-green-600">{salary.month}</td>
                        <td className="border border-green-600">{salary.subject}</td>
                        <td className="border border-green-600">{salary.subjectAmount}</td>
                        <td className="border border-green-600">{salary.paymentCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalaryHistory;
