import React from 'react'
import '../stylesheets/Payment.css'

export default function PaymentConfirm() {



    return (
        <div>
            <h3>Payment Confirmation</h3>
            <div className='get-center'>
                <div>
                    Your Payment has recieved<br />
                    <label>
                        Student ID : <br />
                        Student Name : <br />
                        Month : <br />
                        Total Amount : <br />
                        Paid Subjects : <br />
                        Payment ID : <br />
                    </label>
                    <br /><button>Back to Home</button>
                    <br /><button>Download Payment Reciept</button>
                </div>
            </div>
        </div>
    )
}
