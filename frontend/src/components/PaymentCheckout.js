import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from 'axios';

function PaymentCheckout() {

    const location = useLocation();

    const [studentId] = useState(location.state.sId);
    const [grade] = useState(location.state.sGrade);
    const [subjects] = useState(location.state.sSubjects);
    const [date] = useState(location.state.sDate);
    const [paidAmount] = useState(location.state.sPaidAmount);
    const [month] = useState(location.state.sMonth);

    const [success, setSuccess] = useState(false)
    const stripe = useStripe();
    const element = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: element.getElement(CardElement)
        })


        if (!error) {
            try {
                const { id } = paymentMethod;
                const response = await axios.post('http://localhost:9090/payment', {
                    amount: paidAmount*100,
                    id
                })

                if (response.data.success) {
                    console.log("payment succesfull")
                    setSuccess(true);
                }
            } catch (error) {
                console.log("error", error)
            }
        } else {
            console.log(error.message)
        }
    }

    const CARD_OPTIONS = {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: "#000000",
                color: "#000000",
                fontWeight: 500,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",
                ":-webkit-autofill": { color: "#000000" },
                "::placeholder": { color: "#000000" }
            },
            invalid: {
                iconColor: "#ed0000",
                color: "#ed0000"
            }
        }
    }

    return (

        <>


            {!success ?
                <form onSubmit={handleSubmit}>
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
                    </div>
                    <fieldset className="FormGroup">
                        <div className="FormRow">
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                    </fieldset>
                    <button>Pay</button>
                </form>
                :
                <div>
                    <h2>You paid for fees</h2>
                </div>
            }
        </>
    )
}

export default PaymentCheckout;
