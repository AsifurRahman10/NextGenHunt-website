import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
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
  } = blog;
  return (
    <Link to={`/blog-details/${_id}`}>
      <div className="bg-white rounded-lg h-full flex flex-col p-4 hover:shadow-lg transition-shadow duration-300 relative">
        {/* Image */}
        <div className="overflow-hidden rounded-md">
          <img
            className="rounded-md h-[300px] w-full object-cover hover:scale-105 transition-transform duration-300"
            src={image}
            alt=""
          />
        </div>

        {/* Tags */}
        <div
          className={`${
            location
              ? "absolute top-8 flex flex-wrap gap-2 left-6"
              : "flex flex-wrap gap-2 mt-4"
          }`}
        >
          {allTag.map((item, idx) => (
            <div
              key={idx}
              className="badge badge-neutral font-semibold  text-gray-600 border-none rounded-md px-2 py-1 text-sm bg-[#ffffff]"
            >
              {item?.text}
            </div>
          ))}
        </div>
        {location && (
          <div className="flex items-center text-[15px] gap-1 mt-[1.25rem]">
            <h5 className="text-btnPrimary font-semibold">Author name</h5>
            <p className="space-x-1 text-gray-600">
              <span>on</span> Publish date
            </p>
          </div>
        )}

        {/* Product Name */}
        <h2 className="font-bold text-[1.5rem] text-gray-800 my-2">
          {productName}
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-600">
          {product_description.split(" ").splice(0, 20).join(" ") + "..."}
        </p>
      </div>
    </Link>
  );
}
