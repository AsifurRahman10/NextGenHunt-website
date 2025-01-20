export const ProductCard = ({ product }) => {
  const { id, image, name, ownerId, tags, timestamp, upvotes, _id } = product;
  return (
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
        {tags.map((item, idx) => (
          <div
            key={idx}
            className="badge badge-neutral bg-[#f0f0f2] text-gray-700 border-none rounded-md px-2 py-1 text-sm"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Product Name */}
      <h2 className="font-semibold text-xl text-gray-800 mt-3">{name}</h2>

      {/* Description */}
      <p className="text-gray-600 mt-2 text-sm">
        Aesthetic and easy-to-use habit tracker for Notion.
      </p>
    </div>
  );
};
