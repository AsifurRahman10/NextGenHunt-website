export const Title = ({ title, para, align, btn }) => {
  console.log(align);
  return (
    <div
      className={`my-10 w-11/12 lg:w-9/12 mx-auto text-center ${
        align === "left"
          ? "lg:text-left"
          : align === "right"
          ? "lg:text-right"
          : "lg:text-center"
      }`}
    >
      <div className="flex items-center justify-between flex-col lg:flex-row">
        <div>
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="font-medium text-gray-600">{para}</p>
        </div>
        <div className={`${btn} pt-6`}>
          <button className="btn bg-transparent border-btnPrimary border-2 hover:bg-btnPrimary hover:text-white">
            Explore All Products
          </button>
        </div>
      </div>
    </div>
  );
};
