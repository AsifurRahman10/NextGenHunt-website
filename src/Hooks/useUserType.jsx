import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { useAxiosSecure } from "./useAxiosSecure";

const useUserType = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userType, isPending: isTypeLoading } = useQuery({
    queryKey: [user?.email, "user-type"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-role/${user.email}`);
      return res.data?.userRole;
    },
  });
  console.log(userType);
  return [userType, isTypeLoading];
};

export default useUserType;
