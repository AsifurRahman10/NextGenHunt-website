import logo from "../assets/logo.png";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { AiOutlineProduct } from "react-icons/ai";
import { MdLibraryAdd, MdLogout } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { useAuth } from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../Hooks/useAxiosSecure";
import { Loading } from "../Component/Share/Loading";
import { User } from "../Component/DashboardNavLink/User";
import { Moderator } from "../Component/DashboardNavLink/Moderator";
import { Admin } from "../Component/DashboardNavLink/Admin";

export const DashboardLayout = () => {
  const { signout, user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/user-role/${user.email}`);
      return res.data;
    },
  });
  console.log(data);
  if (isLoading || loading) {
    return <Loading />;
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-[#f6f6f6]">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn ml-4 md:ml-14 mt-6 md:mt-10 drawer-button lg:hidden w-[70px] md:w-[100px] bg-gray-200"
        >
          <IoMenu className="text-2xl md:text-3xl " />
        </label>
        <div className="flex w-full p-4">
          {/* Main content */}
          <div className="ml-1 md:mx-10 lg:mt-10 w-full mr-2">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-[#2C2C2C] text-[#8b8b8b] min-h-full w-80 p-4 font-medium text-lg">
          <li>
            <img src={logo} className="mb-6" alt="Logo" />
          </li>
          {/* for user   */}
          {data.userRole == "user" && <User></User>}

          {/* Moderator */}
          {data.userRole == "moderator" && <Moderator></Moderator>}

          {/* Admin */}
          {data.userRole == "admin" && <Admin></Admin>}
          <div className="mt-auto mb-10 ml-4">
            <Link
              to="/"
              className="hover:text-[#e7f726] flex items-center gap-2"
            >
              <IoIosHome className="text-xl" /> Home
            </Link>
            <Link
              onClick={() => signout()}
              className="flex items-center hover:text-[#e7f726] mt-2"
            >
              <MdLogout className="text-xl mr-2" /> Logout
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};
