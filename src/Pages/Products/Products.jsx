import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "../../Component/Share/ProductCard";
import { Loading } from "../../Component/Share/Loading";
export const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_DB}/all-products/?search=${search}`)
      .then((res) => {
        console.log(search);
        setAllProducts(res.data);
        setLoading(false);
      });
  }, [search]);
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="w-11/12 md:w-9/12 mx-auto my-10">
      <div className="flex items-center justify-between mt-10">
        <h3 className="text-3xl font-bold">Discover the World of Tech Tools</h3>
        <div>
          <form>
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
        </div>
      </div>
      <div className="divider"></div>
      {/* card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 lg:gap-16 mt-4">
        {allProducts.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};
