import React from 'react'

export default function ViewPayment() {
    const [subject, setSubject] = useState('');
    const [grade, setGrade] = useState('');
    const [month, setMonth] = useState('');
    const [payments, setPayments] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`/api/payments?subject=${subject}&grade=${grade}&month=${month}`);
            setPayments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div>
                <h2>Search Payments</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Subject:
                        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </label>
                    <label>
                        Grade:
                        <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} />
                    </label>
                    <label>
                        Month:
                        <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} />
                    </label>
                    <button type="submit">Search</button>
                </form>
                <ul>
                    {payments.map((payment) => (
                        <li key={payment._id}>
                            {payment.studentId} paid {payment.paidAmount} on {payment.date}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
