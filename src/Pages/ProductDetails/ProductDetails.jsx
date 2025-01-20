import axios from "axios";
import { BiSolidUpvote } from "react-icons/bi";
import { CiShoppingTag } from "react-icons/ci";
import { useLoaderData, useParams } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../Component/Share/Loading";
import { VoteButton } from "../../Component/Share/VoteButton";

export const ProductDetails = () => {
  const { id } = useParams();
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
  const { user } = useAuth();
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
    </div>
  );
};
