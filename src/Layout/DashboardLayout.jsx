import logo from "../assets/logo.png";
import { CgProfile } from "react-icons/cg";
import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
import { MdLibraryAdd } from "react-icons/md";

export const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-[#f6f6f6]">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
        <div className="flex w-full p-4">
          {/* Main content */}
          <div className="ml-10 mt-10 w-full">
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
          <li>
            <NavLink
              to={"/dashboard/my-profile"}
              className={({ isActive }) =>
                `${isActive ? "text-[#e7f726] bg-[#444444]" : ""}`
              }
            >
              <CgProfile className="text-xl mr-1" /> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/add-products"}
              className={({ isActive }) =>
                `${isActive ? "text-[#e7f726] bg-[#444444]" : ""}`
              }
            >
              <AiOutlineProduct className="text-xl mr-1" />
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/my-products"}
              className={({ isActive }) =>
                `${isActive ? "text-[#e7f726] bg-[#444444]" : ""}`
              }
            >
              <MdLibraryAdd className="text-xl mr-1" />
              My Products
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
