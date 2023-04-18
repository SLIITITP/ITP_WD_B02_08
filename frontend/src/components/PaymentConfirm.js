import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../stylesheets/Payment.css'

export default function PaymentConfirm() {

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div>
            <h2>Payment Confirmation</h2>
            <div className='get-center'>
                <div>
                    Your Payment has recieved<br />
                    <label>
                        Student ID : {location.state.studentId}<br />
                        Student Name : {location.state.grade}<br />
                        Month : {location.state.month}<br />
                        Total Amount : {location.state.paidAmount}<br />
                        Paid Subjects : {location.state.subjects.join(', ')}<br />
                        Payment ID : {location.state.paymentID}<br />
                    </label>
                    <br /><button onClick={() => navigate('/')}>Go to Home</button>
                    <br /><button>Download Payment Reciept</button>
                </div>
            </div>
        </div>
    )
}
