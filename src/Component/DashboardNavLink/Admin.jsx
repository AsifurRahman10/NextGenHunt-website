import React from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";

import "./active.css";

export const Admin = () => {
  return (
    <>
      <li>
        <NavLink
          to="/dashboard/statistics-page"
          className="hover:text-white hover:bg-[#3a3a3a]"
        >
          <CgProfile className="text-xl mr-1" /> Statistics Page
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/manage-users"
          className="hover:text-white hover:bg-[#3a3a3a]"
        >
          <AiOutlineProduct className="text-xl mr-1" />
          Manage Users
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/manage-coupons"
          className="hover:text-white hover:bg-[#3a3a3a]"
        >
          <AiOutlineProduct className="text-xl mr-1" />
          Manage Coupons
        </NavLink>
      </li>
    </>
  );
};
