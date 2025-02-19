import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../Hooks/useAuth";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { Loading } from "../../../Component/Share/Loading";
import { PaymentModal } from "../../../Component/PaymentModal/PaymentModal";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { CgProfile } from "react-icons/cg";

export const MyProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");

  // user info data
  const { data, isLoading } = useQuery({
    queryKey: [user],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_DB}/user-info/${user?.email}`
      );
      return res.data;
    },
  });
  // check is the user is subscribed
  const {
    data: subscribed,
    isLoading: subLoading,
    refetch,
  } = useQuery({
    queryKey: ["paid"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_DB}/subscription-check/${user.email}`
      );
      return res.data;
    },
  });

  if (subLoading || isLoading || loading) {
    return <Loading></Loading>;
  }
  // const { email, name, image } = data;

  const handleSubscribe = () => {
    document.getElementById("my_modal_1").showModal();
    setError("");
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>My profile - NextGenHunt</title>
      </Helmet>
      <h2 className="text-lg font-semibold flex items-center bg-btnPrimary w-[150px] text-white py-2 justify-center rounded-lg">
        <CgProfile className="text-xl mr-2" /> My Profile
      </h2>

      {/* information */}
      <div className="mt-6 flex gap-6 flex-col bg-white rounded-lg p-5">
        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL}
            className="w-[100px] h-[100px] rounded object-cover"
            alt=""
          />
          <div>
            <button className="relative hidden group cursor-pointer text-sky-50  overflow-hidden h-10 w-36 rounded-md bg-btnPrimary p-2 flex justify-center items-center font-extrabold">
              <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#5030ce]"></div>
              <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-32 h-32 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#452ab0]"></div>
              <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-24 h-24 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#37228b]"></div>
              <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-14 h-14 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#2b1a6c]"></div>
              <p className="z-10 flex justify-center items-center gap-2 font-semibold">
                Update Photo
              </p>
            </button>
            <p className="mt-2 text-gray-700 font-medium hidden">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </div>
        </div>

        {/* information */}
        <form>
          <label className="form-control w-full mb-4 space-y-2">
            <span className="label-text">First Name</span>
            <input
              type="text"
              placeholder="John"
              className="input input-bordered w-full"
              defaultValue={user?.displayName}
            />
          </label>

          <label className="form-control w-full mb-4 space-y-2">
            <span className="label-text">E-mail</span>
            <input
              type="email"
              placeholder="john.doe@example.com"
              className="input input-bordered w-full"
              defaultValue={user?.email}
            />
          </label>

          <label className="form-control w-full mb-4 space-y-2">
            <span className="label-text">Phone Number</span>
            <input
              type="number"
              placeholder="Enter phone number"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full mb-4 space-y-2">
            <span className="label-text">Address</span>
            <input
              type="text"
              placeholder="Enter address"
              className="input input-bordered w-full"
            />
          </label>

          <button className="relative hidden group cursor-pointer text-sky-50  overflow-hidden h-10 w-36 rounded-md bg-btnPrimary p-2 flex justify-center items-center font-extrabold">
            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#5030ce]"></div>
            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-32 h-32 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#452ab0]"></div>
            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-24 h-24 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#37228b]"></div>
            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-14 h-14 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#2b1a6c]"></div>
            <p className="z-10 flex justify-center items-center gap-2 font-semibold">
              Submit
            </p>
          </button>
        </form>
        {data.role === "user" && (
          <div className="pt-2">
            {subscribed ? (
              <p className="text-lg text-gray-600 flex items-center">
                Status : <FaCheckCircle className="ml-2 text-[#B4DC8C] mr-1" />{" "}
                <span className="text-[#8cb365]">Verified</span>
              </p>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-gray-600 text-sm">
                  Not subscribed yet?
                </span>
                <button
                  onClick={handleSubscribe}
                  className="btn bg-btnPrimary hover:bg-[#273343] text-white font-medium px-4 py-2 rounded-lg transition duration-200 ease-in-out"
                >
                  Subscribe Now at 20$
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {data.role === "user" && (
        <PaymentModal
          error={error}
          setError={setError}
          refetch={refetch}
          user={user}
        ></PaymentModal>
      )}
    </div>
  );
};
