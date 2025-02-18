import moment from "moment";
import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  const {
    image,
    blogName,
    blogDetails,
    externalLinks,
    allTag,
    userName,
    email,
    userPhoto,
    _id,
    timestamp,
  } = blog;
  console.log(blog);
  console.log(allTag);
  return (
    <Link to={`/blog-details/${_id}`}>
      <div className="bg-white rounded-lg h-full flex flex-col p-4 hover:shadow-lg transition-shadow duration-300 relative ">
        {/* Image */}
        <div className="overflow-hidden rounded-md">
          <img
            className="rounded-md h-[300px] w-full object-cover hover:scale-105 transition-transform duration-300"
            src={image}
            alt=""
          />
        </div>

        {/* Tags */}
        <div className="absolute top-8 flex flex-wrap gap-2 left-6">
          {allTag.map((item, idx) => (
            <div
              key={idx}
              className="badge badge-neutral font-semibold  text-gray-600 border-none rounded-md px-2 py-1 text-sm bg-[#ffffff]"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex items-center text-[15px] gap-1 mt-[1.25rem]">
          <h5 className="text-btnPrimary font-semibold">{userName}</h5>
          <p className="space-x-1 text-gray-600">
            <span>on</span> {moment(timestamp).format("MMMM D, YYYY")}
          </p>
        </div>

        {/* Product Name */}
        <h2 className="font-bold text-[1.5rem] text-gray-800 my-2">
          {blogName}
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-600">
          {blogDetails.split(" ").splice(1, 20).join(" ") + "..."}
        </p>
      </div>
    </Link>
  );
}
