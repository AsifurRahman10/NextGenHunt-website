import logo from "../assets/logo.png";
import { NavLink, Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { User } from "../Component/DashBoardNavigation/User";
import { Moderator } from "../Component/DashBoardNavigation/Moderator";

export const DashboardLayout = () => {
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
          <img src={logo} className="mb-6" alt="" />

          {/* Sidebar content here */}
          {/* user content */}
          <User></User>

          {/* moderator */}
          <Moderator></Moderator>
        </ul>
      </div>
    </div>
  );
};
