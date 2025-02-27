import { Rating } from "@smastrom/react-rating";
import image from "../../assets/couponBg.jpg";
import { ReviewCard } from "../../Component/ReviewCard/ReviewCard";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import { useAuth } from "../../Hooks/useAuth";
import { FaCommentDots } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { Loading } from "../../Component/Share/Loading";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { CommentCard } from "../../Component/CommentCard/CommentCard";
import { ThemeContext } from "../../Provider/ThemeProvider";

export default function BlogDetails() {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [comment, setComment] = useState("");
  const { isDarkMode } = useContext(ThemeContext);

  // get product details
  const {
    data: blogData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_DB}/blog/${id}`
      );
      return res.data;
    },
  });

  // get product review
  const {
    data: commentData = [],
    isLoading: commentLoading,
    refetch: refetchComment,
  } = useQuery({
    queryKey: ["reviewsItem"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_DB}/all-comment/${id}`
      );
      return res.data;
    },
  });

  const {
    _id,
    blogName,
    image,
    externalLinks,
    allTag,
    blogDetails,
    userName,
    email,
    userPhoto,
    timestamp,
    status,
  } = blogData;
  if (isLoading || commentLoading) {
    return <Loading></Loading>;
  }

  const handleComment = async () => {
    const commentData = {
      name: user?.displayName,
      photo: user?.photoURL,
      comment,
      productId: _id,
    };
    try {
      await axiosSecure.post(
        `${import.meta.env.VITE_DB}/add-comment`,
        commentData
      );
      setComment("");
      refetchComment();
      Swal.fire({
        text: "You comment has been posted!",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-11/12 lg:w-9/12 mx-auto pt-2 lg:pt-6 pb-10 dark:text-white">
      {/* author description */}
      <div className="flex items-center text-[15px] gap-1 mt-[1.25rem] justify-center">
        <h5 className="text-btnPrimary font-semibold">{userName}</h5>
        <p className="space-x-1 text-gray-600 dark:text-gray-300 text-lg">
          <span>on</span> {moment(timestamp).format("MMMM D, YYYY")}
        </p>
      </div>
      {/* title */}
      <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold my-2 lg:my-4 text-center text-black dark:text-white lg:w-10/12 mx-auto">
        {blogName}
      </h3>
      {/* tags */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {allTag.map((item, idx) => (
          <div
            key={idx}
            className="badge badge-neutral font-semibold  text-gray-600 border-none rounded-md px-2 py-1 text-sm bg-[#f0f0f2]"
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* image */}

      <img
        src={image}
        className="rounded-lg mt-8 lg:h-[700px] w-full object-cover"
        alt=""
      />
      <ReactQuill
        value={blogDetails}
        readOnly={true}
        theme="bubble"
        className={`custom-quill ${
          isDarkMode ? "dark:bg-transparent dark:text-white" : ""
        }`}
      />
      {/* comment section */}

      <div className="divider mt-0"></div>

      {/* Post a review */}
      <h2 className="text-2xl font-bold mb-4">Leave a comment</h2>
      <div className="relative">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="textarea textarea-bordered w-full mt-4"
          placeholder="Share your comment"
          rows={6}
        ></textarea>
        <button
          onClick={handleComment}
          className="btn btn-outline border-btnPrimary px-8 absolute bottom-4 left-4  hover:bg-btnPrimary hover:text-white hover:border-none"
        >
          <FaCommentDots className="text-lg" />
          Comment
        </button>
      </div>
      <div className="flex items-center gap-2 justify-end my-4 lg:my-2">
        <h4 className=" text-gray-500">Posting as {user.displayName}</h4>
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={user.photoURL} alt="" />
          </div>
        </div>
      </div>

      {/* Show reviews */}
      <h4 className="my-2 lg:my-4 font-bold">
        View Comments {commentData.length}
      </h4>
      {commentData.length > 0 ? (
        <>
          {commentData.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))}
        </>
      ) : (
        <p>No reviews yet. Be the first to share your thoughts!</p>
      )}
    </div>
  );
}
