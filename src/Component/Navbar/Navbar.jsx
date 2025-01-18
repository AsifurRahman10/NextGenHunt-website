import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const navList = (
    <>
      <li className="">
        <NavLink to="/product">Products</NavLink>
      </li>
    </>
  );

  return (
    <nav className="py-3 shadow-md bg-[#FFFFFF]">
      <div className="navbar w-9/12 mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Dropdown for Mobile */}
          <div className="dropdown">
            <button
              tabIndex={0}
              role="button"
              aria-label="Open menu"
              className="btn btn-ghost lg:hidden"
              onClick={() => setProfileDropdown(!profileDropdown)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            {profileDropdown && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 w-52 rounded-box p-2 shadow"
              >
                {navList}
              </ul>
            )}
          </div>
          {/* Brand Name */}
          <a href="/" className="btn btn-ghost text-xl font-bold">
            NextGenHunt
          </a>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 hover:underline">
            {navList}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {/* User Profile */}
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              role="button"
              aria-label="User profile menu"
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <div className="w-10 rounded-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="User avatar"
                />
              </div>
            </button>
            {openMenu && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 w-52 rounded-box p-2 shadow"
              >
                {navList}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
