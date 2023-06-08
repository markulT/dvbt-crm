import {FC, useEffect} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {useAppSelector} from "@/store/hooks/redux";
import {Elements, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY)

const TestPaymentPage: FC = () => {

    const clientSecret = useAppSelector((state) => state.orders.clientSecret)
    console.log(clientSecret)

    return (
        <div className={"min-h-screen"}>
            <Elements stripe={stripePromise} options={{clientSecret:clientSecret}}>
                <CheckoutForm />
            </Elements>
        </div>
    )
}

const CheckoutForm = () => {
    const clientSecret = useAppSelector((state) => state.orders.clientSecret)
    const stripe = useStripe()
    const elements = useElements()

    async function handleSubmit(e) {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: ''
            }
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement/>
            <button disabled={!stripe}>Submit</button>
        </form>
    )
}

export default TestPaymentPage