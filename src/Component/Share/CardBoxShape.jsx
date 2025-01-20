import { Link } from "react-router-dom";
import { VoteButton } from "./VoteButton";

export const CardBoxShape = ({ product, refetch }) => {
  const { image, name, tags, upvotes, _id } = product;
  const voteData = {
    name,
    productId: _id,
    image,
  };
  return (
    <div className="card bg-base-100 hover:border-2 hover:border-btnPrimary transition-all duration-100 ease-in-out">
      <figure className="px-10 pt-10">
        <img src={image} alt="product" className="rounded-xl h-[150px]" />
      </figure>
      <div className="card-body items-center text-center">
        <Link to={`/product-details/${_id}`}>
          <h2 className="card-title">{name}</h2>
        </Link>
        <div>
          {tags.map((item, idx) => (
            <div key={idx} className="badge bg-btnPrimary text-white">
              {item}
            </div>
          ))}
        </div>
        <div className="card-actions mt-2">
          <VoteButton
            _id={_id}
            refetch={refetch}
            voteData={voteData}
            upvotes={upvotes}
          ></VoteButton>
        </div>
      </div>
    </div>
  );
};
