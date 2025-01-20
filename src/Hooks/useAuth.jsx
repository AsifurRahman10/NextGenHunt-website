import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
