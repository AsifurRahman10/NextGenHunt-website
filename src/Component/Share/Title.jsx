import { Link } from "react-router-dom";

export const Title = ({ title, para, align, btn, section }) => {
  return (
    <div
      className={`my-5 ${
        section ? "lg:mt-10 lg:mb-0" : "lg:my-10"
      } w-11/12 lg:w-9/12 mx-auto text-center ${
        align === "left"
          ? "lg:text-left"
          : align === "right"
          ? "lg:text-right"
          : "lg:text-center"
      }`}
    >
      <div
        className={`flex items-center flex-col lg:flex-row ${
          btn == "hidden" ? "justify-center" : "justify-between"
        }`}
      >
        <div>
          <h2 className="text-3xl font-bold mb-4 dark:text-white">{title}</h2>
          <p className="font-medium text-gray-600 dark:text-gray-300">{para}</p>
        </div>
        <button
          className={`${btn} btn  border-btnPrimary mt-4 btn-outline btn-primary`}
        >
          <Link to={"/products"}>All Products</Link>
        </button>
      </div>
    </div>
  );
};
