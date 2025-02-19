import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { Loading } from "../../../Component/Share/Loading";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

export const ReportedContent = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure("/reported");
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleDelete = (id) => {
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
    <div>
      <h3 className="text-3xl font-bold">Reported Contents</h3>
      <Helmet>
        <title>Reported Content - NextGenHunt</title>
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
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.length > 0 ? (
              data.map((item, idx) => (
                <tr
                  key={item._id}
                  className="bg-white border-b hover:bg-gray-50 transition-all"
                >
                  <th className="lg:pl-8 font-medium text-gray-900">
                    {idx + 1}
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item?.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item?.productName}</td>
                  <th>
                    <div
                      className={`badge p-2 text-white ${
                        item?.status === "pending"
                          ? "bg-orange-400"
                          : item.status === "accepted"
                          ? "bg-green-400"
                          : item.status === "rejected"
                          ? "bg-red-400"
                          : "bg-gray-400"
                      }`}
                    >
                      {item?.status === "pending" && "Pending"}
                      {item?.status === "accepted" && "Accepted"}
                      {item?.status === "rejected" && "Rejected"}
                    </div>
                  </th>

                  <td>
                    <Link to={`/product-details/${item._id}`}>
                      <button className="btn btn-sm hover:bg-btnPrimary hover:text-white">
                        View Details
                      </button>
                    </Link>
                  </td>

                  <th>
                    <button
                      onClick={() => handleDelete(item?._id)}
                      className="btn btn-ghost bg-[#B91C1C] text-white"
                    >
                      <MdDelete className="text-lg" />
                    </button>
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
