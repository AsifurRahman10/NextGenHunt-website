import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaUnlockAlt } from "react-icons/fa";
import { useAuth } from "../../Hooks/useAuth";
import { IoIosLogOut } from "react-icons/io";
import { Loading } from "../Share/Loading";

export const Navbar = () => {
  // const [profileDropdown, setProfileDropdown] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { user, signout } = useAuth();

  const handleSignOut = () => {
    signout();
  };

  const navList = (
    <>
      <li className="">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="">
        <NavLink to="/products">Products</NavLink>
      </li>
    </>
  );

  return (
    <nav className="shadow-md bg-[#FFFFFF]">
      <div className="navbar w-11/12 lg:w-9/12 mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Dropdown for Mobile */}
          <div className="dropdown">
            <button
              tabIndex={0}
              role="button"
              aria-label="Open menu"
              className="btn btn-ghost lg:hidden"
              onClick={() => setOpenMenu(!openMenu)}
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
            {openMenu && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 w-52 rounded-box p-2 shadow bg-[#FFFFFF]"
              >
                {navList}
              </ul>
            )}
          </div>
          {/* Brand Name */}
          <Link to={"/"} className="">
            <img className="lg:w-60" src={logo} alt="" />
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 ">{navList}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                role="button"
                aria-label="User profile menu"
                className="btn btn-ghost btn-circle avatar"
                onClick={() => setOpenMenu(!openMenu)}
              >
                <div className="w-20 rounded-full">
                  <img src={user.photoURL} alt="User avatar" />
                </div>
              </button>
              {openMenu && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 w-52 rounded-box p-2 shadow bg-white z-50"
                >
                  <li className="text-sm  text-gray-700 block px-4 py-2">
                    Hi {user.displayName}!
                  </li>
                  <li>
                    <Link
                      to={"/dashboard"}
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <div className="py-1">
                    <Link
                      onClick={handleSignOut}
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                    >
                      Sign out
                    </Link>
                  </div>
                </ul>
              )}
            </div>
          ) : (
            <Link to={"/login"}>
              <button className="btn bg-btnPrimary text-white font-medium px-4 lg:px-8">
                <FaUnlockAlt /> Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
