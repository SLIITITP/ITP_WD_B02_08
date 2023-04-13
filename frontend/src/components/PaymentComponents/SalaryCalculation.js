import { useState, useEffect } from 'react';

function SalaryCalculation() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [grade, setGrade] = useState('');
  const [month, setMonth] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    // Fetch payment data from API
    fetch('/api/payments')
      .then(response => response.json())
      .then(data => setPayments(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    // Filter payments by grade, month, and subject
    if (grade && month && subject) {
      const filtered = payments.filter(payment => 
        payment.grade === grade && payment.month === month && payment.subjects.includes(subject)
      );
      setFilteredPayments(filtered);
    } else {
      setFilteredPayments([]);
    }
  }, [payments, grade, month, subject]);

  const totalPaidAmount = filteredPayments.reduce((acc, payment) => acc + payment.paidAmount, 0);

  return (
    <div>
      <label htmlFor="grade">Grade:</label>
      <input type="text" id="grade" value={grade} onChange={event => setGrade(event.target.value)} />
      <label htmlFor="month">Month:</label>
      <input type="text" id="month" value={month} onChange={event => setMonth(event.target.value)} />
      <label htmlFor="subject">Subject:</label>
      <input type="text" id="subject" value={subject} onChange={event => setSubject(event.target.value)} />

      {filteredPayments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Paid Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map(payment => (
              <tr key={payment._id}>
                <td>{payment.studentId}</td>
                <td>{payment.paidAmount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total Paid Amount:</td>
              <td>{totalPaidAmount}</td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <p>No payments found.</p>
      )}
    </div>
  );
}

export default SalaryCalculation;
