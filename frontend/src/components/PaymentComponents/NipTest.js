import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SalaryPaymentCount() {
  const [teacherName, setTeacherName] = useState('');
  const [grade, setGrade] = useState('');
  const [month, setMonth] = useState('');
  const [subject, setSubject] = useState('');
  
  const [totalPaymentCount, setTotalPaymentCount] = useState('');
  useEffect(() => {
    const fetchCountData = async () => {
      try {
        const response = await axios.get(`/api/salary/paymentcount?teacherName=${teacherName}&grade=${grade}&month=${month}&subject=${subject}`);
        setTotalPaymentCount(response.data.paymentCount);
      } catch (error) {
        console.error(error);
      }
    };

    if (teacherName && grade && month && subject) {
      fetchCountData();
    }
  }, [teacherName, grade, month, subject]);

  const handleTeacherNameChange = event => {
    setTeacherName(event.target.value);
  };

  const handleGradeChange = event => {
    setGrade(event.target.value);
  };

  const handleMonthChange = event => {
    setMonth(event.target.value);
  };

  const handleSubjectChange = event => {
    setSubject(event.target.value);
  };

  return (
    <div>
      <h1>Get Salary Payment Count</h1>
      <form>
        <label>
          Teacher Name:
          <input type="text" value={teacherName} onChange={handleTeacherNameChange} />
        </label>
        <br />
        <label>
          Grade:
          <input type="text" value={grade} onChange={handleGradeChange} />
        </label>
        <br />
        <label>
          Month:
          <input type="text" value={month} onChange={handleMonthChange} />
        </label>
        <br />
        <label>
          Subject:
          <input type="text" value={subject} onChange={handleSubjectChange} />
        </label>
        <br />
      </form>
      {totalPaymentCount && (
        <p>
          Payment Count: {totalPaymentCount}
        </p>
      )}
    </div>
  );
}

export default SalaryPaymentCount;