import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CardElement, Elements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your_publishable_key_here");

function ComponentB() {

    const location = useLocation();

    const [studentId] = useState(location.state.sId);
    const [grade] = useState(location.state.sGrade);
    const [subjects] = useState(location.state.sSubjects);
    const [date] = useState(location.state.sDate);
    const [paidAmount] = useState(location.state.sPaidAmount);
    const [month] = useState(location.state.sMonth);



    return (

        <>
            <div className='container'>
                Confirm details & Pay
                <hr />
                <div>
                    <label>
                        Your Student ID : {studentId}
                    </label><br />
                    <label>
                        Grade : {grade}
                    </label><br />
                    {subjects && (
                        <label>
                            Subjects : {subjects.join(', ')}
                        </label>
                    )}<br />
                    <label>
                        Total Amount : {paidAmount}
                    </label><br />
                    <label>
                        Month : {month}
                    </label><br />
                    <label>
                        Payment Date : {date}
                    </label><br />
                </div>
                <hr />
                <div>
                    Add Card Payment details
                    <div>
                        {/* Card Element */}

                        <Elements stripe={stripePromise}>
                            <CardElement />
                        </Elements>

                    </div>
                </div>
            </div>

        </>
    )
}

export default ComponentB;
