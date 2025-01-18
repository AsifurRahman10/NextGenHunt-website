import { BiSolidUpvote } from "react-icons/bi";
import { FaRegThumbsUp } from "react-icons/fa";

export const CardBoxShape = ({ product }) => {
  console.log(product);
  const { image, name, tags, upvotes } = product;
  return (
    <div className="card bg-base-100 hover:border-2 hover:border-btnPrimary transition-all duration-100 ease-in-out">
      <figure className="px-10 pt-10">
        <img src={image} alt="product" className="rounded-xl h-[150px]" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>
          {tags.map((item) => (
            <div class="badge bg-btnPrimary text-white">{item}</div>
          ))}
        </p>
        <div className="card-actions">
          <button className="btn btn-primary bg-transparent text-black">
            <BiSolidUpvote /> {upvotes}
          </button>
        </div>
      </div>
    </div>
  );
};
