import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../../Component/Share/Loading";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

export default function ManageBlog() {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get(`${import.meta.env.VITE_DB}/blogs`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  const handleDelete = async (id) => {
    await axiosSecure.delete(`${import.meta.env.VITE_DB}/delete-blog/${id}`);
    Swal.fire({
      title: "Blog has been deleted",
      icon: "success",
    });
    refetch();
  };
  return (
    <div className="">
      <Helmet>
        <title>Manage blogs - NextGenHunt</title>
      </Helmet>
      <h3 className="text-3xl font-bold">All blogs</h3>

      <div className="overflow-x-auto mt-8">
        <table className="table">
          {/* head */}
          <thead className="bg-[#f9f9f9]">
            <tr className="h-16">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              {/* <th>Action</th> */}
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
                <td className="whitespace-nowrap">{item.blogName}</td>

                {/* <th>
                  <Link to={`/dashboard/update-products/${item._id}`}>
                    <button className="btn btn-ghost bg-btnPrimary text-white">
                      <LuSquarePen className="text-lg" />
                    </button>
                  </Link>
                </th> */}
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
}
