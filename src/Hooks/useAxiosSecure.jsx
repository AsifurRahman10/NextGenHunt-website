import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const axiosSecure = axios.create({ baseURL: import.meta.env.VITE_DB });

export const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();
  // send request with interceptor
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (err) => {
      console.log(err);
      if (err.status === 401 || err.status === 403) {
        await signout();
        navigate("/login");
      }
      return Promise.reject(err);
    }
  );
  return axiosSecure;
};
