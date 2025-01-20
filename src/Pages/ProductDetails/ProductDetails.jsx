import axios from "axios";
import { CiShoppingTag, CiStar } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../Component/Share/Loading";
import { VoteButton } from "../../Component/Share/VoteButton";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import noImg from "../../assets/noImg.png";
import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import "@smastrom/react-rating/style.css";
import { FaStar } from "react-icons/fa";

export const ProductDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  console.log(rating);
  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_DB}/product-details/${id}`
      );
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  const { image, name, tags, timestamp, upvotes, _id } = data;
  const voteData = {
    name,
    productId: _id,
    image,
    email: user.email,
  };
  return (
    <div className="w-11/12 md:w-10/12 lg:w-9/12 mx-auto py-20">
      <div className="flex items-center justify-between">
        {/* title part */}
        <div className="flex items-center gap-4">
          {/* image */}
          <div>
            <img src={image} className="w-16" alt="" />
          </div>
          {/* text */}
          <div>
            <h3 className="text-2xl font-bold mb-2">{name}</h3>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                Tags: <CiShoppingTag className="text-lg" />
              </span>
              {tags.map((item, idx) => (
                <div key={idx} className="badge bg-btnPrimary text-white">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* vote */}
        <div>
          <VoteButton
            voteData={voteData}
            refetch={refetch}
            _id={_id}
            upvotes={upvotes}
          ></VoteButton>
        </div>
      </div>
      {/* description */}
      <p className="mt-6">
        Completely harness compelling paradigms before innovative value.
        Progressively grow interactive relationships through enterprise
        e-markets. Interactively simplify flexible users with 24/7
        architectures. Progressively maintain professional e-business with high
        standards in outsourcing. Credibly recaptiualize robust schemas for
        bleeding-edge schemas. Distinctively integrate B2B vortals without
        strategic mindshare. Progressively re-engineer diverse.
      </p>
      {/* External Link */}
      <p className="mt-4 font-semibold">
        Want to know more?{" "}
        <Link to="https://google.com" target="_blank">
          <span className="underline text-blue-500 hover:text-blue-700">
            Visit their website
          </span>
        </Link>
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
          className="textarea textarea-bordered w-full mt-4"
          placeholder="Share your thoughts about this product"
          rows={6}
        ></textarea>
        <button className="btn btn-outline border-btnPrimary px-8 absolute bottom-4 left-4">
          <HiMiniPaperAirplane className="text-lg" />
          Post
        </button>
      </div>
      <div className="flex items-center gap-2 justify-end my-2">
        <h4 className=" text-gray-500">Posting as {user.displayName}</h4>
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={user.photoURL} alt="" />
          </div>
        </div>
      </div>

      {/* Show reviews */}
      <h4 className="mt-4 font-bold">
        See the reviews posted by our community
      </h4>
      <div className="mt-6">
        <div className="flex items-start gap-4">
          {/* Image */}
          <img src={noImg} className="w-12 h-12" alt="" />
          {/* Review content */}
          <div>
            {/* User Info */}
            <p className="font-bold">{user.displayName}</p>
            <p className="flex text-2xl text-yellow-400">
              <Rating style={{ maxWidth: 100 }} value={rating} isRequired />
            </p>
            {/* Description */}
            <p className="mt-2">
              Synergistically repurpose cross-unit functionalities vis-a-vis
              virtual action items. Compellingly visualize innovative
              information rather than corporate e-tailers. Efficiently repurpose
              resource maximizing growth strategies without turnkey
              functionalities. Professionally supply granular mindshare through
              future-proof alignments. Credibly incentivize top-line paradigms
              without high-payoff platforms. Energistically transition
              goal-oriented relationships without intermandated partnerships.
              Synergistically benchmark extensive sources whereas frictionless
              best practices. Objectively unleash
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
