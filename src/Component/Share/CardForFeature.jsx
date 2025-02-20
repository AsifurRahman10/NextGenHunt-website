import { Link } from "react-router-dom";
import { VoteButton } from "./VoteButton";

export const CardForFeature = ({ product, refetch }) => {
  const { image, productName, product_description, productId, upvote, allTag } =
    product;
  const voteData = {
    productName,
    productId: productId,
    image,
  };
  return (
    <Link to={`/product-details/${productId}`}>
      <div className="border-gray-200 bg-white shadow-md rounded-lg p-4 border h-full">
        <div className="flex items-center ">
          {/* Icon */}
          <div className="flex items-center justify-center bg-black p-2 rounded-md">
            <img src={image} alt="Icon" className="w-8 h-8 object-contain" />
          </div>

          {/* Content */}
          <div className="flex-1 ml-4">
            <h2 className="font-medium text-gray-900 text-sm">{productName}</h2>

            <p className="text-gray-600 text-xs">
              {product_description.split(" ").slice(0, 25).join(" ")}
              {product_description.split(" ").length > 25 ? "..." : ""}
            </p>
          </div>

          {/* Favorite Icon */}
          <VoteButton
            _id={productId}
            refetch={refetch}
            voteData={voteData}
            upvote={upvote}
          ></VoteButton>
        </div>
      </div>
    </Link>
  );
};
