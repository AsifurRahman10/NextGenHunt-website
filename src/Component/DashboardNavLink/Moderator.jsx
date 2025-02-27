import { AiOutlineProduct } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";

import "./active.css";

export const Moderator = () => {
  return (
    <>
      <li>
        <NavLink
          to="/dashboard/moderator-profile"
          className="hover:text-white hover:bg-[#3a3a3a]"
        >
          <CgProfile className="text-xl mr-1" /> Profile
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/product-review"
          className="hover:text-white hover:bg-[#3a3a3a]"
        >
          <CgProfile className="text-xl mr-1" /> Product review
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/reported-content"
          className="hover:text-white hover:bg-[#3a3a3a]"
        >
          <AiOutlineProduct className="text-xl mr-1" />
          Reported Content
        </NavLink>
      </li>
    </>
  );
};
