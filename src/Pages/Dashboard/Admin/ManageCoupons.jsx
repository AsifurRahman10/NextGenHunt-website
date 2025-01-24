import { Helmet } from "react-helmet-async";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

export const ManageCoupons = () => {
  const [startDate, setStartDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const couponData = { ...data, expireDate: startDate };

    axiosSecure.post("/add-coupon", couponData).then((res) => {
      if (res.data.insertedId) {
        const modal = document.getElementById("my_modal_3");
        modal.close();
        Swal.fire({
          title: "Successful!",
          text: "You coupon has been added",
          icon: "success",
        });
        reset();
      }
    });
  };
  return (
    <div>
      <h3 className="text-3xl font-bold mt-4">Manage Coupons</h3>
      <Helmet>
        <title>Manage Coupons - NextGenHunt</title>
      </Helmet>

      {/* table design */}

      <button
        onClick={() => document.getElementById("my_modal_3").showModal()}
        className="block ml-auto btn bg-btnPrimary text-white  mt-8 mb-4"
      >
        Add Coupon
      </button>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#f9f9f9]">
            <tr className="h-16">
              <th>#</th>
              <th>Coupon code</th>
              <th>Expiry date</th>
              <th>Coupon description</th>
              <th>Discount amount</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {/* {data.map((item, idx) => (
              <tr
                key={item._id}
                className="bg-white border-b hover:bg-gray-50 transition-all"
              >
                <th className="lg:pl-8 font-medium text-gray-900">{idx + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.productName}</td>
                <td>{item.upvote}</td>
                <th>
                  <div
                    className={`badge p-2 text-white ${
                      item.status === "pending"
                        ? "bg-orange-400"
                        : item.status === "accepted"
                        ? "bg-green-400"
                        : item.status === "rejected"
                        ? "bg-red-400"
                        : "bg-gray-400"
                    }`}
                  >
                    {item.status === "pending" && "Pending"}
                    {item.status === "accepted" && "Accepted"}
                    {item.status === "rejected" && "Rejected"}
                  </div>
                </th>
                <th>
                  <Link to={`/dashboard/update-products/${item._id}`}>
                    <button className="btn btn-ghost bg-btnPrimary text-white">
                      <LuSquarePen className="text-lg" />
                    </button>
                  </Link>
                </th>
                <th>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost bg-[#B91C1C] text-white"
                  >
                    <MdDelete className="text-lg" />
                  </button>
                </th>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
      <dialog id="my_modal_3" className="modal">
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
              />
            </div>
            {/* Coupon code */}
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
                  <BsCalendar2Date className="absolute top-[15px] left-48" />
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
              ></textarea>
            </div>
            {/* Discount Amount */}
            <div className="form-control mt-2">
              <label className="label">
                <span className="label-text">Discount Amount</span>
              </label>
              <input
                {...register("discountAmount", { required: true })}
                type="text"
                placeholder="Discount Amount"
                className="input input-bordered"
                required
              />
            </div>
            <button className="block ml-auto btn bg-btnPrimary text-white w-full my-4">
              Publish Coupon
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};
