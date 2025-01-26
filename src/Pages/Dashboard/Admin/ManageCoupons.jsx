import { Helmet } from "react-helmet-async";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../../Component/Share/Loading";
import moment from "moment";
import { LuSquarePen } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { UpdateCouponModal } from "../../../Component/Modal/AddCouponModal";

export const ManageCoupons = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [updateId, setUpdateId] = useState("");
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure("/all-coupons");
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm();

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleUpdate = (id) => {
    document.getElementById("my_modal_2").showModal();
    setUpdateId(id);
  };

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
        refetch();
      }
    });
  };

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/coupon/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Coupon has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
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
              <th>Edit Token</th>
              <th>Delete Token</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((item, idx) => (
              <tr
                key={item._id}
                className="bg-white border-b hover:bg-gray-50 transition-all"
              >
                <th className="lg:pl-8 font-medium text-gray-900">{idx + 1}</th>
                <td>{item.couponCode}</td>
                <th> {moment(item.expireDate).format("DD-MM-YYYY")}</th>
                <td className="relative group">
                  <span className="block max-w-[150px] truncate cursor-pointer">
                    {item.couponDescription}
                  </span>
                  <div className="absolute left-0 top-full z-10 hidden w-64 p-2 text-sm text-white bg-gray-800 rounded-md shadow-lg group-hover:block">
                    {item.couponDescription}
                  </div>
                </td>
                <td>$ {item.discountAmount}</td>

                <th>
                  <button
                    onClick={() => handleUpdate(item._id)}
                    className="btn btn-ghost bg-btnPrimary text-white"
                  >
                    <LuSquarePen className="text-lg" />
                  </button>
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
            ))}
          </tbody>
        </table>
      </div>
      {/* add coupon modal */}
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

      {/* update coupon modal */}
      {/* add coupon modal */}
      <UpdateCouponModal refetch={refetch} updateId={updateId} />
    </div>
  );
};
