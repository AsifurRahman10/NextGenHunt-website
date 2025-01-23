import axios from "axios";
import { CiShoppingTag, CiStar } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../Component/Share/Loading";
import { VoteButton } from "../../Component/Share/VoteButton";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import "@smastrom/react-rating/style.css";
import Swal from "sweetalert2";
import { ReviewCard } from "../../Component/ReviewCard/ReviewCard";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

export const ProductDetails = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  // get product details
  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_DB}/product-details/${id}`
      );
      return res.data;
    },
  });

  // get product review
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    refetch: refetchReview,
  } = useQuery({
    queryKey: ["reviewsItem"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_DB}/all-review/${id}`
      );
      return res.data;
    },
  });

  if (isLoading || reviewsLoading) {
    return <Loading></Loading>;
  }

  const {
    image,
    productName,
    product_description,
    externalLinks,
    allTag,
    userName,
    email,
    userPhoto,
    _id,
    upvote,
  } = data;

  const handleReview = async () => {
    const reviewData = {
      name: user?.displayName,
      photo: user?.photoURL,
      review,
      rating,
      productId: _id,
    };
    try {
      await axios.post(`${import.meta.env.VITE_DB}/post-review`, reviewData);
      setReview("");
      setRating(0);
      refetchReview();
      Swal.fire({
        text: "You review has been posted!",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // data for vote
  const voteData = {
    name,
    productId: _id,
    image,
    email: user.email,
  };
  return (
    <div className="w-11/12 md:w-10/12 lg:w-9/12 mx-auto py-10 lg:py-20">
      <Helmet>
        <title>{productName} - NextGenHunt</title>
      </Helmet>
      <div className="flex items-center flex-col md:flex-row justify-between">
        {/* title part */}
        <div className="flex flex-col md:flex-row items-center lg:gap-4">
          {/* image */}
          <div>
            <img src={image} className="w-full lg:w-80" alt="" />
          </div>
          {/* text */}
          <div>
            <h3 className="text-2xl font-bold mb-2">{productName}</h3>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                Tags: <CiShoppingTag className="text-lg" />
              </span>
              {allTag?.map((item, idx) => (
                <div key={idx} className="badge bg-btnPrimary text-white">
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* vote */}
        <div className="mt-4 md:mt-0">
          <VoteButton
            voteData={voteData}
            refetch={refetch}
            _id={_id}
            upvote={upvote}
          ></VoteButton>
        </div>
      </div>
      {/* description */}
      <p className="mt-6">{product_description}</p>
      {/* External Link */}
      <p className="mt-4 font-semibold">
        Want to know more?{" "}
        {externalLinks.map((item) => (
          <Link to={item} target="_blank">
            <span className="underline text-blue-500 hover:text-blue-700">
              Visit their website
            </span>
          </Link>
        ))}
      </p>
      <div className="divider"></div>

      {/* Post a review */}
      <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
      <div className="flex items-center gap-2">
        <h2 className="font-semibold">Rate this product</h2>
        <Rating
          style={{ maxWidth: 180 }}
          value={rating}
          onChange={setRating}
          isRequired
        />
      </div>
      <div className="relative">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="textarea textarea-bordered w-full mt-4"
          placeholder="Share your thoughts about this product"
          rows={6}
        ></textarea>
        <button
          onClick={handleReview}
          className="btn btn-outline border-btnPrimary px-8 absolute bottom-4 left-4"
        >
          <HiMiniPaperAirplane className="text-lg" />
          Post
        </button>
      </div>
      <div className="flex items-center gap-2 justify-end my-4 lg:my-2">
        <h4 className=" text-gray-500">Posting as {userName}</h4>
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={userPhoto} alt="" />
          </div>
        </div>
      </div>

      {/* Show reviews */}
      <h4 className="my-2 lg:my-4 font-bold">
        See the reviews posted by our community
      </h4>
      {reviews.length > 0 ? (
        <>
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review}></ReviewCard>
          ))}
        </>
      ) : (
        <p>No reviews yet. Be the first to share your thoughts!</p>
      )}
    </div>
  );
};
