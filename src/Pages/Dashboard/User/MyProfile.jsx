import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../Hooks/useAuth";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { Loading } from "../../../Component/Share/Loading";
import { PaymentModal } from "../../../Component/PaymentModal/PaymentModal";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

export const MyProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

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
  };

  return (
    <div className="w-full min-h-screen md:min-h-0">
      <Helmet>
        <title>{name} - NextGenHunt</title>
      </Helmet>
      <h2 className="text-4xl font-bold">My Profile</h2>

      {/* information */}
      <div className="mt-6 md:mt-10 flex gap-6 flex-col md:flex-row">
        <div>
          <img src={image} className="w-[250px] mx-auto md:mr-auto" alt="" />
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
      <PaymentModal refetch={refetch} user={user}></PaymentModal>
    </div>
  );
};
