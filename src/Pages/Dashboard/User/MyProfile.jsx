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
  const { email, name, image } = data;

  const handleSubscribe = () => {
    document.getElementById("my_modal_1").showModal();
    setError("");
  };

  return (
    <div className="w-full min-h-screen">
      <Helmet>
        <title>My profile - NextGenHunt</title>
      </Helmet>
      <h2 className="text-lg font-semibold flex items-center bg-btnPrimary w-[150px] text-white py-2 justify-center rounded-lg">
        <CgProfile className="text-xl mr-2" /> My Profile
      </h2>

      {/* information */}
      <div className="mt-6 md:mt-10 flex gap-6 flex-col bg-white rounded-lg p-3">
        <div className="flex items-center gap-4">
          <img src={image} className="w-[100px]  rounded" alt="" />
          <div>
            <button class="relative group cursor-pointer text-sky-50  overflow-hidden h-10 w-36 rounded-md bg-btnPrimary p-2 flex justify-center items-center font-extrabold">
              <div class="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#5030ce]"></div>
              <div class="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-32 h-32 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#452ab0]"></div>
              <div class="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-24 h-24 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#37228b]"></div>
              <div class="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-14 h-14 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#2b1a6c]"></div>
              <p class="z-10 flex justify-center items-center gap-2 font-semibold">
                Update Photo
              </p>
            </button>
            <p className="mt-2 text-gray-700 font-medium">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </div>
        </div>

        <div className="pt-2">
          <h3 className="text-3xl text-gray-800 font-semibold mb-4">{name}</h3>
          <p className="text-lg text-gray-600 mb-2">
            <span className="font-medium">Email:</span> {email}
          </p>
          {subscribed ? (
            <p className="text-lg text-gray-600 flex items-center">
              Status : <FaCheckCircle className="ml-2 text-[#B4DC8C] mr-1" />{" "}
              <span className="text-[#8cb365]">Verified</span>
            </p>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-gray-600 text-sm">Not subscribed yet?</span>
              <button
                onClick={handleSubscribe}
                className="btn bg-btnPrimary hover:bg-[#273343] text-white font-medium px-4 py-2 rounded-lg transition duration-200 ease-in-out"
              >
                Subscribe Now at 20$
              </button>
            </div>
          )}
        </div>
      </div>
      <PaymentModal
        error={error}
        setError={setError}
        refetch={refetch}
        user={user}
      ></PaymentModal>
    </div>
  );
};
