import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./CheckoutForm";

const stripePromise = loadStripe(`${import.meta.env.VITE_Stripe_key}`);
export const PaymentModal = ({ user }) => {
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

          <p className="text-gray-700 pb-4">
            <span className="font-medium">Payable Amount:</span>{" "}
            <span className="text-xl font-semibold text-[#2C2C2C]">$20</span>
          </p>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm user={user} />
        </Elements>
      </div>
    </dialog>
  );
};
