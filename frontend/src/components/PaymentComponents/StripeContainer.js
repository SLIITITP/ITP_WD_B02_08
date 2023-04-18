import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentCheckout from "./PaymentCheckout"

const PUBLIC_KEY = "pk_test_51Mv33dSFgoKe0L2HWoryPdT141GwEUsZyBVumWi5baechQv41A5mfn25nnhxvu70TnRguzcK7df5eRAOGAxtWCk700kRoszk0X"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentCheckout />
		</Elements>
	)
}