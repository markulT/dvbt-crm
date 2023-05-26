import {FC, useEffect} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {useAppSelector} from "@/store/hooks/redux";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY)

const TestPaymentPage:FC = () => {

    const clientSecret = useAppSelector((state)=>state.orders.clientSecret)



    return (
        <div className={"min-h-screen"}>

        </div>
    )
}
export default TestPaymentPage