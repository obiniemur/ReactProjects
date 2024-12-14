import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useEffect} from "react";
import {useState} from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseCart from "../../../Hooks/UseCart";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = UseCart();
  const Totalprice = cart.reduce((total, item) => total + item.price, 0);
  const navigate = useNavigate()

  const {user} = useAuth();

  useEffect(() => {
    if (Totalprice > 0) {
      axiosSecure.post("/create-payment-intent", {price: Totalprice}).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, Totalprice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment Error", error);
      setError(error.message);
    } else {
      console.log("Payment Method", paymentMethod);
      setError("");
    }

    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      },
    });

    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        const payment = {
          email: user.email,
          price: Totalprice,
          transactionId: paymentIntent.id,
          date: new Date(), //convert UTC moment
          cartIds: cart.map((item) => item._id),
          menuItemIds: cart.map((item) => item.menuId),
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log("payment saved", res.data);
        refetch();
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "middle",
            icon: "success",
            title: "Bah Beta kudur bap. Bala boroloki dekas. bank o nai ek taka aisos, kaite. dur sala",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/dashboard/paymentHistory')
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && <p className="text-green-600">Your transaction ID: {transactionId} </p>}
    </form>
  );
};

export default CheckoutForm;
