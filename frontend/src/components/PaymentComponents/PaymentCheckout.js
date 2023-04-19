import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from 'axios';

function PaymentCheckout() {

    const navigate = useNavigate();
    const location = useLocation();

    const [studentId] = useState(location.state.sId);
    const [grade] = useState(location.state.sGrade);
    const [subjects] = useState(location.state.sSubjects);
    const [date] = useState(location.state.sDate);
    const [paidAmount] = useState(location.state.sPaidAmount);
    const [month] = useState(location.state.sMonth);
    const [subjectsIDs] = useState(location.state.sSubIDs);

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
                    amount: paidAmount * 100,
                    id
                })

                if (response.data.success) {
                    console.log("payment succesfull")
                    setSuccess(true);

                    // Update database with payment information
                    const paymentData = {
                        studentId,
                        grade,
                        subjects,
                        subjectsIDs,
                        paidAmount,
                        month,
                        date,
                        paymentID: id
                    };
                    const updateResponse = await axios.post('http://localhost:9090/api/payment/add', paymentData);
                    console.log("Payment added to DB");
                    navigate('/confirmPayment', {
                        state: {
                            studentId,
                            grade,
                            subjects,
                            subjectsIDs,
                            paidAmount,
                            month,
                            date,
                            paymentID: id
                        }
                    });
                }
            } catch (error) {
                console.log("error", error)
                alert(error.message)

            }
        } else {
            console.log(error.message)
            alert(error.message)
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
                fontSize: "20px",
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

        <div className="h-screen h-full  w-full flex text-md font-medium text-gray-900 dark:text-white">
            <>
                <div className='flex justify-center items-center h-screen w-full w-screen bg-gray-300 p-4 pt-2'>
                    {!success ?
                        <form onSubmit={handleSubmit} >
                            <div>
                                <h3 className='text-3xl font-bold text-center text-blue-900 tracking-tight p-2'>_______________Confirm details & Pay_______________</h3>
                                <hr />
                                <div>
                                    <div className='p-5 pb-3 pt-3 text-lg'>
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
                                </div>
                                <hr />
                            </div>
                            <div className='m-2'>
                                <p className='mb-2'>Enter Card details</p>
                                <fieldset className="FormGroup">
                                    <div className="FormRow">
                                        <CardElement options={CARD_OPTIONS} />
                                    </div>
                                </fieldset>
                            </div>
                            <button className='disabled:bg-gray-400 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full mt-3'>Pay</button>
                        </form>
                        :
                        <div>
                            <h2>Your Payment Succesfull</h2>
                        </div>
                    }
                </div>
            </>
        </div>
    )
}

export default PaymentCheckout;
