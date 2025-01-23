import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { Loading } from "../../../Component/Share/Loading";
import { Link } from "react-router-dom";
import { LuSquarePen } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

export const ProductReview = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["product-data"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-products-sorted");
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h3 className="text-3xl font-bold">Review product</h3>

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
                  <div className="badge bg-orange-400 text-white p-2">
                    {item.status === "pending" && "Pending"}
                  </div>
                </th>
                <td>
                  <button className="btn btn-sm">View Details</button>
                </td>

                <th>
                  <Link to={`/dashboard/update-products/${item._id}`}>
                    <button className="btn btn-ghost bg-btnPrimary text-white">
                      <FaCheck className="text-lg" />
                    </button>
                  </Link>
                </th>
                <th>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost bg-[#B91C1C] text-white"
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
