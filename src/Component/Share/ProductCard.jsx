import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
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
  } = product;
  return (
    <Link to={`/product-details/${_id}`}>
      <div className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
        {/* Image */}
        <div className="overflow-hidden rounded-md">
          <img
            className="rounded-md h-[300px] w-full object-cover hover:scale-105 transition-transform duration-300"
            src={image}
            alt=""
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {allTag.map((item, idx) => (
            <div
              key={idx}
              className="badge badge-neutral bg-[#f0f0f2] text-gray-700 border-none rounded-md px-2 py-1 text-sm"
            >
              {item.text}
            </div>
          ))}
        </div>

        {/* Product Name */}
        <h2 className="font-semibold text-xl text-gray-800 mt-3">
          {productName}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mt-2 text-sm">{product_description}</p>
      </div>
    </Link>
  );
};
