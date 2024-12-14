import {loadStripe} from "@stripe/stripe-js";
import SectionTitles from "../../../components/SectionTitle/SectionTitles";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const Payment = () => {
    
  return (
    <div>
      <SectionTitles heading="Payment" subHeading="Salar Beta Pay kor"></SectionTitles>

      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
