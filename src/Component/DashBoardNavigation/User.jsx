import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
import { MdLibraryAdd } from "react-icons/md";

export const User = () => {
  return (
    <>
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
    </>
  );
};
