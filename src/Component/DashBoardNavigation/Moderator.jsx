import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
import { MdLibraryAdd } from "react-icons/md";

export const Moderator = () => {
  return (
    <>
      <li>
        <NavLink
          to={"/dashboard/product-review"}
          className={({ isActive }) =>
            `${isActive ? "text-[#e7f726] bg-[#444444]" : ""}`
          }
        >
          <CgProfile className="text-xl mr-1" /> Product review
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
    </>
  );
};
