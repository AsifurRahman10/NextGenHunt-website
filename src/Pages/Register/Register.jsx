import { FaEye } from "react-icons/fa";
import login from "../../assets/login.jpg";
import { SocialLogin } from "../../Component/Share/SocialLogin";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Register = () => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="w-11/12 md:w-10/12 lg:w-9/12 mx-auto flex flex-col-reverse my-10 md:my-20 lg:my-0 lg:flex-row justify-center items-center">
      {/* image */}
      <div className="flex-1">
        <img
          src={login}
          className="h-[600px] md:h-[600px] lg:h-[calc(100vh-0px)] w-full bg-cover object-cover"
          alt=""
        />
      </div>
      {/* login box */}
      <div className="card flex-1 lg:shrink-0 md:w-9/12 w-11/12 lg:w-fit">
        <h3 className="text-2xl font-bold text-center">
          Join our community, register to NextGenHunt
        </h3>
        <form className="card-body w-full lg:w-9/12 mx-auto">
          {/* name */}
          <div className="form-control mt-2">
            <input
              type="text"
              placeholder="Enter you Name"
              className="input rounded-full bg-[#f3f3f3]"
              required
            />
          </div>
          {/* email */}
          <div className="form-control mt-2">
            <input
              type="email"
              placeholder="Enter you email"
              className="input rounded-full bg-[#f3f3f3]"
              required
            />
          </div>
          {/* upload photo */}

          {/* password */}
          <div className="form-control relative mt-2">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="input rounded-full bg-[#f3f3f3]"
              required
            />
            <span
              className="absolute top-4 right-5 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              <FaEye />
            </span>
            <label className="label block text-right mt-4 ">
              <a
                href="#"
                className="label-text-alt link link-hover text-gray-700 font-medium"
              >
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-2 ">
            <button className="btn bg-btnPrimary text-white rounded-full">
              Register
            </button>
          </div>
          <div className="divider">Or login with</div>
          <SocialLogin></SocialLogin>
          <h5 className="text-center py-6 text-gray-600">
            Already have an account? ,{" "}
            <Link to={"/login"}>
              <span className="text-btnPrimary cursor-pointer font-semibold">
                Sign in now
              </span>
            </Link>
          </h5>
        </form>
      </div>
    </div>
  );
};
