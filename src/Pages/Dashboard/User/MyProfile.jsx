import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../Hooks/useAuth";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { Loading } from "../../../Component/Share/Loading";

export const MyProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: [user],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_DB}/user-info/${user?.email}`
      );
      return res.data;
    },
  });
  if (isLoading || loading) {
    return <Loading></Loading>;
  }
  const { email, name, image, role } = data;

  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold">My Profile</h2>

      {/* information */}
      <div className="mt-10 flex gap-6">
        <div>
          <img src={image} className="w-[250px]" alt="" />
        </div>
        <div className="pt-2">
          <h3 className="text-3xl text-gray-800 font-semibold mb-4">{name}</h3>
          <p className="text-lg text-gray-600 mb-4">
            <span className="font-medium">Email:</span> {email}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">Not subscribed yet?</span>
            <button className="btn bg-btnPrimary hover:bg-[#273343] text-white font-medium px-4 py-2 rounded-lg transition duration-200 ease-in-out">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
