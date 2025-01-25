import { AiOutlineProduct } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdLibraryAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";

import "./active.css";

export const User = () => {
  return (
    <>
      <li>
        <NavLink
          to="/dashboard/my-profile"
          className="hover:text-white hover:bg-[#3a3a3a]"
        >
          <CgProfile className="text-xl mr-2" /> My Profile
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/add-products"
          className="hover:text-white hover:bg-[#3a3a3a]"
        >
          <AiOutlineProduct className="text-xl mr-2" />
          Add Product
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/my-products"
          className="hover:text-white hover:bg-[#3a3a3a]"
        >
          <MdLibraryAdd className="text-xl mr-2" />
          My Products
        </NavLink>
      </li>
    </>
  );
};
