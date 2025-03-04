import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaUnlockAlt } from "react-icons/fa";
import { useAuth } from "../../Hooks/useAuth";
import "./Navbar.css";
import useUserType from "../../Hooks/useUserType";
import { ThemeContext } from "../../Provider/ThemeProvider";

export const Navbar = () => {
  const [userType] = useUserType();
  const [openMenu, setOpenMenu] = useState(false);
  const { user, signout } = useAuth();
  const { isDarkMode, handleToggle } = useContext(ThemeContext);

  const handleSignOut = () => {
    signout();
  };

  const navList = (
    <>
      <li className="nav-col">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="nav-col">
        <NavLink to="/products">Products</NavLink>
      </li>
      <li className="nav-col">
        <NavLink to="/blogs">Blogs</NavLink>
      </li>
      <li className="nav-col">
        <NavLink to="/about-us">About us</NavLink>
      </li>
    </>
  );

  return (
    <nav className="shadow-md bg-[#FFFFFF] dark:text-white dark:bg-[#1C1C1C] fixed z-50 w-full">
      <div className="navbar w-11/12 lg:w-9/12 mx-auto py-0">
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
                className="menu menu-sm dropdown-content mt-3 w-52 rounded-box p-2 shadow bg-[#FFFFFF] dark:bg-[#1C1C1C] dark:text-white space-y-2"
              >
                {navList}
                <li>
                  <label className="inline-flex items-center relative border-2 rounded-full w-[90px]">
                    <input
                      checked={isDarkMode}
                      onChange={handleToggle}
                      className="peer hidden"
                      id="toggle"
                      type="checkbox"
                    />
                    <div className="relative w-[70px] h-[30px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-[20px] after:h-[20px] after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900 after:rounded-full after:top-[5px] after:left-[5px] active:after:w-[25px] peer-checked:after:left-[65px] peer-checked:after:translate-x-[-100%] shadow-sm duration-300 after:duration-300 after:shadow-md"></div>
                    <svg
                      height="0"
                      width="100"
                      viewBox="0 0 24 24"
                      data-name="Layer 1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-white peer-checked:opacity-60 absolute w-6 h-4 left-[19px]"
                    >
                      <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z"></path>
                    </svg>
                    <svg
                      height="512"
                      width="512"
                      viewBox="0 0 24 24"
                      data-name="Layer 1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-4 h-4 right-[12px]"
                    >
                      <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM16,14a1,1,0,0,0,2,0A1,1,0,0,0,16,14Zm6,4a1,1,0,0,0,2,0A1,1,0,0,0,22,18Z"></path>
                    </svg>
                  </label>
                </li>
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
          <ul className="menu menu-horizontal px-1">{navList}</ul>
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
                    {["user", "moderator", "admin"].includes(userType) && (
                      <>
                        <Link
                          to={`/dashboard/${
                            userType === "user"
                              ? "my-profile"
                              : userType === "moderator"
                              ? "product-review"
                              : "statistics-page"
                          }`}
                          className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to={`/dashboard/${userType}-profile`}
                          className="text-sm hover:bg-gray-100 text-gray-700 px-4 py-2 flex"
                        >
                          My Profile
                        </Link>
                      </>
                    )}
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
            <>
              <Link to={"/login"}>
                <button className="relative group cursor-pointer text-sky-50  overflow-hidden h-10 w-36 rounded-md bg-btnPrimary p-2 flex justify-center items-center font-extrabold">
                  <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#5030ce]"></div>
                  <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-32 h-32 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#452ab0]"></div>
                  <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-24 h-24 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#37228b]"></div>
                  <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-14 h-14 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#2b1a6c]"></div>
                  <p className="z-10 flex justify-center items-center gap-2 font-semibold">
                    <FaUnlockAlt /> Login
                  </p>
                </button>
              </Link>
              <label className=" items-center relative border-2 rounded-full ml-6 hidden md:inline-flex">
                <input
                  checked={isDarkMode}
                  onChange={handleToggle}
                  className="peer hidden"
                  id="toggle"
                  type="checkbox"
                />
                <div className="relative w-[70px] h-[30px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-[20px] after:h-[20px] after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900 after:rounded-full after:top-[5px] after:left-[5px] active:after:w-[25px] peer-checked:after:left-[65px] peer-checked:after:translate-x-[-100%] shadow-sm duration-300 after:duration-300 after:shadow-md"></div>
                <svg
                  height="0"
                  width="100"
                  viewBox="0 0 24 24"
                  data-name="Layer 1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white peer-checked:opacity-60 absolute w-4 h-4 left-[7px]"
                >
                  <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z"></path>
                </svg>
                <svg
                  height="512"
                  width="512"
                  viewBox="0 0 24 24"
                  data-name="Layer 1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-4 h-4 right-[7px]"
                >
                  <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM16,14a1,1,0,0,0,2,0A1,1,0,0,0,16,14Zm6,4a1,1,0,0,0,2,0A1,1,0,0,0,22,18Z"></path>
                </svg>
              </label>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
