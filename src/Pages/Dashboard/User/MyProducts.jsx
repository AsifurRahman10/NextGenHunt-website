import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { useAuth } from "../../../Hooks/useAuth";
import { Loading } from "../../../Component/Share/Loading";
import { LuSquarePen } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const MyProducts = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-products"],
    queryFn: async () => {
      const res = await axiosSecure(`/products/${user.email}`);
      return res.data;
    },
  });
  if (loading || isLoading) {
    return <Loading />;
  }

  const handleDelete = (id) => {
    console.log(id);
    try {
      Swal.fire({
        title: "Are you sure you want to delete this product?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/product/${id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your product has been deleted.",
                icon: "success",
              });
              refetch();
            }
          });
        }
      });
    } catch (error) {}
  };

  return (
    <div className="mb-10 md:mb-20">
      <h3 className="text-3xl font-bold">My Products</h3>

      {/* table design */}
      <div className="overflow-x-auto mt-8">
        <table className="table">
          {/* head */}
          <thead className="bg-[#f9f9f9]">
            <tr className="h-16">
              <th>#</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Total Vote</th>
              <th>Status</th>
              <th>Action</th>
              <th>Action</th>
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
                <td>{item.upvote}</td>
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
                <th>
                  <Link to={`/dashboard/update-products/${item._id}`}>
                    <button className="btn btn-ghost bg-btnPrimary text-white">
                      <LuSquarePen className="text-lg" />
                    </button>
                  </Link>
                </th>
                <th>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost bg-[#B91C1C] text-white"
                  >
                    <MdDelete className="text-lg" />
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
