import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./style.css";
import { useEffect, useState } from "react";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

export const CheckoutForm = ({
  user,
  validCoupon,
  setValidCoupon,
  refetch,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: 20 }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
    }

    // create payment intent
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "N/A",
            name: user?.displayName || "N/A",
          },
        },
      });

    if (confirmError) {
    } else {
      // Directly use the paymentIntent.id for Swal instead of the state
      const transactionId = paymentIntent.id;
      setTransactionId(transactionId); // Optionally update state for other use

      if (paymentIntent.status === "succeeded") {
        const paymentData = {
          email: user?.email,
          name: user?.displayName,
          transactionId,
          date: new Date(),
          status: "paid",
          price:
            validCoupon && !isNaN(parseInt(validCoupon.discountAmount))
              ? 20 - parseInt(validCoupon.discountAmount)
              : 20,
        };

        axiosSecure.post("/paymentInfo", paymentData).then((res) => {
          if (res.data.insertedId) {
            axiosSecure.patch(`/upgrade-user/${user?.email}`);
            e.target.reset();
            const modal = document.getElementById("my_modal_1");
            modal.close();
            setValidCoupon({});
            refetch();
            Swal.fire({
              title: "Payment Successful!",
              text: `Transaction ID: ${transactionId}`, // Use the transactionId directly
              icon: "success",
            });
          }
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "20px",
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
      {transactionId && (
        <p className="mb-4 text-green-600">
          <span className="text-black">Transaction ID :</span>
          {transactionId}
        </p>
      )}
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <button
        className="btn bg-btnPrimary px-8 text-white w-full"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay{" "}
        {validCoupon && !isNaN(parseInt(validCoupon.discountAmount))
          ? 20 - parseInt(validCoupon.discountAmount)
          : 20}
        $
      </button>
    </form>
  );
};
