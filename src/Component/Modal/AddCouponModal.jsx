import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { BsCalendar2Date } from "react-icons/bs";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

export const UpdateCouponModal = ({ updateId, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [existingCoupon, setExistingCoupon] = useState({});
  const [startDate, setStartDate] = useState(null);
  useEffect(() => {
    if (updateId) {
      axiosSecure(`/coupon-details/${updateId}`).then((res) => {
        setExistingCoupon(res.data);
        if (res.data.expireDate) {
          setStartDate(new Date(res.data.expireDate));
        }
      });
    }
  }, [updateId]);
  const onSubmit = (data) => {
    const couponData = { ...data, expireDate: startDate };
    axiosSecure.patch(`/update-coupon/${updateId}`, couponData).then((res) => {
      if (res.data.modifiedCount) {
        const modal = document.getElementById("my_modal_2");
        modal.close();
        refetch();
        Swal.fire({
          title: "Successful",
          text: "You Coupon has been updated",
          icon: "success",
        });
        reset();
      }
    });
  };
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Fill up the form to add coupon</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Coupon code */}
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Coupon code</span>
            </label>
            <input
              {...register("couponCode", { required: true })}
              type="text"
              placeholder="Coupon code"
              className="input input-bordered"
              required
              defaultValue={existingCoupon?.couponCode}
            />
          </div>
          {/* Coupon date */}
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Expire date</span>
            </label>
            <div className="relative">
              <DatePicker
                className="border-2 border-gray-300 shadow-md rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-btnPrimary transition duration-300 ease-in-out"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <span>
                <BsCalendar2Date className="absolute top-[13px] left-44" />
              </span>
            </div>
          </div>
          {/* Coupon code description */}
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Coupon code description</span>
            </label>
            <textarea
              {...register("couponDescription", { required: true })}
              className="textarea textarea-bordered"
              placeholder="Coupon code description"
              defaultValue={existingCoupon.couponDescription}
            ></textarea>
          </div>
          {/* Discount Amount */}
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Discount Amount</span>
            </label>
            <input
              {...register("discountAmount", { required: true })}
              type="number"
              placeholder="Discount Amount"
              className="input input-bordered"
              required
              defaultValue={existingCoupon.discountAmount}
            />
          </div>
          <button className="block ml-auto btn bg-btnPrimary text-white w-full my-4">
            Update Coupon
          </button>
        </form>
      </div>
    </dialog>
  );
};
