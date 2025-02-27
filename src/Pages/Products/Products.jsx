import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "../../Component/Share/ProductCard";
import { Loading } from "../../Component/Share/Loading";
import { Helmet } from "react-helmet-async";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { motion } from "motion/react";
export const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [productCount, setProductCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState("");
  const axiosSecure = useAxiosSecure();

  const productPerPage = 6;

  const pageName = Math.ceil(productCount / productPerPage);

  const totalPages = [...Array(pageName).keys()].map((num) => num + 1);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_DB}/count`).then((res) => {
      setProductCount(res.data.result);
    });
  }, []);

  useEffect(() => {
    axiosSecure
      .get(
        `${
          import.meta.env.VITE_DB
        }/all-products/?search=${search}&page=${currentPage}&size=${productPerPage}&sort=${sorting}`
      )
      .then((res) => {
        setAllProducts(res.data);
        setLoading(false);
      });
  }, [search, currentPage, sorting]);

  // handle prev button
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // handle next button
  const handleNext = () => {
    if (currentPage < pageName) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-11/12 lg:w-9/12 mx-auto my-10">
      <Helmet>
        <title>Home - All Products</title>
      </Helmet>
      <div className="flex items-center flex-col md:flex-row gap-4 justify-between mt-10">
        <h3 className="text-2xl lg:text-3xl font-bold dark:text-white">
          Discover the World of Tech Tools
        </h3>
        <div className="flex items-center gap-2 md:gap-4">
          <form className="w-full">
            <label className="input input-bordered flex items-center gap-2">
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                id="default-search"
                placeholder="Search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </form>
          <>
            <select
              onChange={(e) => setSorting(e.target.value)}
              className="select select-bordered w-11/12 md:w-full"
            >
              <option disabled selected>
                Sort by
              </option>
              <option value={"vote"}>Most upvote</option>
              <option value={"title"}>A - Z</option>
            </select>
          </>
        </div>
      </div>
      <div className="divider"></div>
      {/* card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 lg:gap-16 mt-4">
        {allProducts.map((product, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: index * 0.2,
            }}
            key={product._id}
          >
            <ProductCard product={product}></ProductCard>
          </motion.div>
        ))}
      </div>
      <div className="join mt-8">
        <button
          disabled={currentPage === 1}
          onClick={handlePrev}
          className="btn join-item"
        >
          prev
        </button>
        {totalPages.map((page, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(page)}
            className={`join-item btn ${
              currentPage == page
                ? "bg-btnPrimary text-white  btn-active"
                : "bg-transparent text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          disabled={currentPage == pageName}
          onClick={handleNext}
          className="btn join-item"
        >
          Next
        </button>
      </div>
    </div>
  );
};
