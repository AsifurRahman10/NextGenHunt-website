import { AiOutlineProduct } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";

export const Admin = () => {
  return (
    <>
      <li>
        <NavLink
          to={"/dashboard/statistics-page"}
          className={({ isActive }) =>
            `${isActive ? "text-[#e7f726] bg-[#444444]" : ""}`
          }
        >
          <CgProfile className="text-xl mr-1" /> Statistics Page
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/dashboard/manage-users"}
          className={({ isActive }) =>
            `${isActive ? "text-[#e7f726] bg-[#444444]" : ""}`
          }
        >
          <AiOutlineProduct className="text-xl mr-1" />
          Manage Users
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/dashboard/manage-coupons"}
          className={({ isActive }) =>
            `${isActive ? "text-[#e7f726] bg-[#444444]" : ""}`
          }
        >
          <AiOutlineProduct className="text-xl mr-1" />
          Manage Coupons
        </NavLink>
      </li>
    </>
  );
};
