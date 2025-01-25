import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { Loading } from "../../../Component/Share/Loading";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

export const ProductReview = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["product-data"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-products-sorted");
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleProductAccept = (id) => {
    const status = "accepted";

    axiosSecure.patch(`/update-status/${id}`, { status }).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          title: "Product has been accepted",
          icon: "success",
          draggable: true,
        });
        refetch();
      }
    });
  };

  const handleProductRejected = (id) => {
    const status = "rejected";

    axiosSecure.patch(`/update-status/${id}`, { status }).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          title: "Product has been accepted",
          icon: "success",
          draggable: true,
        });
        refetch();
      }
    });
  };

  const handleAddFeature = (id) => {
    console.log(id);
    const productData = {
      productId: id,
      timestamp: new Date(),
    };
    axiosSecure.post("/feature", productData).then((res) => {
      if (res.data.insertedId) {
      }
    });
  };
  return (
    <div>
      <h3 className="text-3xl font-bold">Review product</h3>
      <Helmet>
        <title>Product Review - NextGenHunt</title>
      </Helmet>

      {/* table design */}
      <div className="overflow-x-auto mt-8">
        <table className="table">
          {/* head */}
          <thead className="bg-[#f9f9f9]">
            <tr className="h-16">
              <th>#</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Status</th>
              <th>Action</th>
              <th>Action</th>
              <th>Accept</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((item, idx) => (
              <tr
                key={item._id}
                className="bg-white border-b hover:bg-gray-50 transition-all"
              >
                <th className="lg:pl-8 font-medium text-gray-900">{idx + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.productName}</td>
                <th>
                  <div
                    className={`badge p-2 text-white ${
                      item.status === "pending"
                        ? "bg-orange-400"
                        : item.status === "accepted"
                        ? "bg-green-400"
                        : item.status === "rejected"
                        ? "bg-red-400"
                        : "bg-gray-400"
                    }`}
                  >
                    {item.status === "pending" && "Pending"}
                    {item.status === "accepted" && "Accepted"}
                    {item.status === "rejected" && "Rejected"}
                  </div>
                </th>

                <td>
                  <Link to={`/product-details/${item._id}`}>
                    <button className="btn btn-sm hover:bg-blue-600 hover:text-white">
                      View Details
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleAddFeature(item._id)}
                    className="btn btn-sm hover:bg-yellow-600 hover:text-white"
                  >
                    Make feature
                  </button>
                </td>

                <th>
                  <button
                    onClick={() => handleProductAccept(item._id)}
                    className="btn btn-ghost bg-green-600 text-white"
                    disabled={item.status == "accepted"}
                  >
                    <FaCheck className="text-lg" />
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => handleProductRejected(item._id)}
                    className="btn btn-ghost bg-red-600 text-white"
                    disabled={item.status == "rejected"}
                  >
                    <IoClose className="text-lg" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
