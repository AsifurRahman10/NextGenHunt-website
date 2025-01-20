import axios from "axios";
import React from "react";
import { BiSolidUpvote } from "react-icons/bi";
import { useAuth } from "../../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export const VoteButton = ({ _id, refetch, voteData, upvotes }) => {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }
  const handleUpvote = async (id) => {
    console.log(id);

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_DB}/vote/${id}`,
        voteData
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
  return (
    <button
      onClick={() => handleUpvote(_id)}
      className="btn text-white bg-[#613cfc] hover:bg-[#4b2bdf] border-2 border-[#613cfc] rounded-lg flex items-center gap-2 py-2 px-4 transition-all duration-200"
    >
      <BiSolidUpvote className="text-xl" />
      <span className="text-sm">Total votes: {upvotes}</span>
    </button>
  );
};
