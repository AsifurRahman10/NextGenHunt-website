import { BiSolidUpvote } from "react-icons/bi";
import { CiShoppingTag } from "react-icons/ci";
import { useLoaderData } from "react-router-dom";

export const ProductDetails = () => {
  const data = useLoaderData();
  const { image, name, tags, timestamp, upvotes } = data;
  const handleUpvote = () => {
    console.log("hello");
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
          <button
            onClick={handleUpvote}
            className="btn text-white bg-[#613cfc] hover:bg-[#4b2bdf] border-2 border-[#613cfc] rounded-lg flex items-center gap-2 py-2 px-4 transition-all duration-200"
          >
            <BiSolidUpvote className="text-xl" />
            <span className="text-sm">Total votes: {upvotes}</span>
          </button>
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
