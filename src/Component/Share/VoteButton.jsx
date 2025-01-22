import axios from "axios";
import React from "react";
import { BiSolidUpvote } from "react-icons/bi";
import { useAuth } from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const VoteButton = ({ _id, refetch, voteData, upvote }) => {
  console.log(_id);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.includes("product-details");

  const handleUpvote = async (id) => {
    if (!user) {
      return navigate("/login");
    }
    try {
      const res = await axios.patch(`${import.meta.env.VITE_DB}/vote/${id}`, {
        ...voteData,
        email: user?.email,
      });
      console.log(res);
      refetch();
    } catch (error) {
      console.log(error);
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
  return path ? (
    <button
      onClick={() => handleUpvote(_id)}
      className="btn text-white bg-[#613cfc] hover:bg-[#4b2bdf] border-2 border-[#613cfc] rounded-lg flex items-center gap-2 py-2 px-4 transition-all duration-200"
    >
      <BiSolidUpvote className="text-xl" />
      <span className="text-sm">Total votes: {upvote}</span>
    </button>
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
