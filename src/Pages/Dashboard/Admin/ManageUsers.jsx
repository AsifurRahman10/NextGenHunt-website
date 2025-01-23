import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { Loading } from "../../../Component/Share/Loading";
import Swal from "sweetalert2";

export const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure("/all-users");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleRoleChange = async (e, id) => {
    const selectedRole = e.target.value;
    const updateData = {
      userId: id,
      role: selectedRole,
    };
    try {
      axiosSecure.patch("/update-role", updateData);
      Swal.fire({
        title: "Successfully",
        text: "Role has been changed",
        icon: "success",
      });
    } catch (error) {}
  };
  return (
    <div>
      <h3 className="text-3xl font-bold">Manage Users</h3>

      {/* table design */}
      <div className="overflow-x-auto mt-8">
        <table className="table">
          {/* head */}
          <thead className="bg-[#f9f9f9]">
            <tr className="h-16">
              <th>#</th>
              <th>User Image</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Role</th>
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
                <td>{item.name}</td>
                <td>{item.email}</td>
                <th>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] md:w-full lg:w-1/2 p-2.5"
                    defaultValue={item.role || ""}
                    onChange={(e) => handleRoleChange(e, item._id)}
                  >
                    <option value="">Choose a role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                  </select>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
