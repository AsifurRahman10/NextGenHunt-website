import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "../../Component/Share/ProductCard";
import { Loading } from "../../Component/Share/Loading";
export const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_DB}/all-products`).then((res) => {
      setAllProducts(res.data);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="w-11/12 md:w-9/12 mx-auto my-10">
      <h3 className="text-3xl font-bold mt-10">
        Discover the World of Tech Tools
      </h3>
      <div className="divider"></div>
      {/* card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 lg:gap-16 mt-8">
        {allProducts.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};
