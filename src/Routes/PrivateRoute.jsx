import { Navigate, useLocation } from "react-router-dom";
import { Loading } from "../Component/Share/Loading";
import { useAuth } from "../Hooks/useAuth";

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }
  return <div>{children}</div>;
};
