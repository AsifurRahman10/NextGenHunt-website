import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(`${import.meta.env.VITE_Stripe_key}`);
export const PaymentModal = ({ user, refetch, setError, error }) => {
  const axiosSecure = useAxiosSecure();
  const [validCoupon, setValidCoupon] = useState({});

  useEffect(() => {
    setError("");
  }, []);
  const handleDiscount = (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const discountCoupon = form.discountCoupon.value;
    axiosSecure("/all-coupons").then((res) => {
      if (res.data.length > 0) {
        const allCoupon = res.data;
        const checkCoupon = allCoupon.find(
          (item) => item.couponCode === discountCoupon
        );
        if (!checkCoupon) {
          setError("Your coupon is not valid");
        }
        setValidCoupon(checkCoupon);
      }
    });
  };
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Payment Information
        </h2>

        <div className="space-y-2">
          <p className="text-gray-700">
            <span className="font-medium">Name:</span> {user?.displayName}
          </p>

          <p className="text-gray-700">
            <span className="font-medium">Email:</span> {user?.email}
          </p>

          <p className="text-gray-700">
            <span className="font-medium">Total Amount:</span>{" "}
            <span className="text-xl font-semibold text-[#2C2C2C]">
              {validCoupon && !isNaN(parseInt(validCoupon.discountAmount))
                ? 20 - parseInt(validCoupon.discountAmount)
                : 20}
              $
            </span>
          </p>
        </div>
        {error && <p className="text-red-600 my-1">{error}</p>}
        <div className="join my-2">
          <form onSubmit={handleDiscount}>
            <input
              type="text"
              placeholder="Enter coupon"
              className="input input-bordered join-item pr-0 md:pr-1"
              name="discountCoupon"
            />
            <button
              type="submit"
              className="btn bg-btnPrimary text-white join-item"
            >
              Add coupon
            </button>
          </form>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            user={user}
            validCoupon={validCoupon}
            setValidCoupon={setValidCoupon}
            refetch={refetch}
          />
        </Elements>
      </div>
    </dialog>
  );
};
