import axios from "axios";
import React from "react";
import { BiSolidUpvote } from "react-icons/bi";
import { useAuth } from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoIosWarning } from "react-icons/io";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import useUserType from "../../Hooks/useUserType";

export const VoteButton = ({ _id, refetch, voteData, upvote }) => {
  const { user } = useAuth();
  const [userType] = useUserType();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.includes("product-details");

  const handleUpvote = async (id) => {
    if (userType !== "user") {
      return Swal.fire({
        icon: "error",
        title: "Only user can vote",
        timer: 1500,
      });
    }
    if (!user) {
      return navigate("/login");
    }
    try {
      const res = await axiosSecure.patch(
        `${import.meta.env.VITE_DB}/vote/${id}`,
        {
          ...voteData,
          email: user?.email,
        }
      );
      refetch();
    } catch (error) {
      if (error.status === 409) {
        Swal.fire({
          icon: "error",
          title: "You have already voted for this product",
          //   showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const handleReport = async (id) => {
    if (userType !== "user") {
      return Swal.fire({
        icon: "error",
        title: "Only user can report",
        timer: 1500,
      });
    }
    try {
      await axiosSecure.patch(`/report/${id}`);
      Swal.fire({
        icon: "error",
        title: "Reported",
        text: "You report has been sent to moderator for review.",
      });
    } catch (error) {}
  };
  return path ? (
    <div className="flex items-center gap-6 md:ml-2">
      <button
        onClick={() => handleUpvote(_id)}
        className="btn text-white bg-[#613cfc] hover:bg-[#4b2bdf] border-2 border-[#613cfc] rounded-full flex items-center gap-2 py-2 px-4 transition-all duration-200"
      >
        <BiSolidUpvote className="text-xl" />
        <span className="text-sm">Total votes: {upvote}</span>
      </button>
      <button
        onClick={() => handleReport(_id)}
        className="btn text-black dark:text-white btn-outline hover:bg-[#4b2bdf] border-2 border-[#613cfc] rounded-full flex items-center gap-2 py-2 px-4 transition-all duration-200"
      >
        <IoIosWarning className="text-xl" />
        <span className="text-sm">Report</span>
      </button>
    </div>
  ) : (
    <button
      onClick={() => handleUpvote(_id)}
      className="ml-auto flex flex-col items-center justify-center px-3 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 hover:text-gray-900 transition-all duration-300 shadow-sm"
    >
      <BiSolidUpvote className="text-lg mb-1" />{" "}
      {/* Larger icon with better spacing */}
      <span className="text-xs font-medium">{upvote}</span> {/* Styled text */}
    </button>
  );
};
