import { Navigate, useLocation } from "react-router-dom";
import { Loading } from "../Component/Share/Loading";
import { useAuth } from "../Hooks/useAuth";
import useUserType from "../Hooks/useUserType";

export const AdminRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const [userType, isTypeLoading] = useUserType();
  const location = useLocation();
  if (loading || isTypeLoading) {
    return <Loading />;
  }
  if (!user || userType !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }
  return <div>{children}</div>;
};
