import { FaArrowLeft, FaEye } from "react-icons/fa";
import loginImg from "../../assets/login.jpg";
import { SocialLogin } from "../../Component/Share/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

export const Login = () => {
  const { login } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({});

  const onSubmit = async (data) => {
    setError("");
    try {
      await login(data.email, data.password);
      Swal.fire({
        title: "Success!",
        text: "Login successful!",
        icon: "success",
      });
      if (state?.from?.pathname) {
        navigate(state.from.pathname);
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // log in ad admin
  const handleAdminLogin = () => {
    const email = "admin@gmail.com";
    const password = "Admin12345";
    setValue("email", email);
    setValue("password", password);
  };
  const handleModeratorLogin = () => {
    const email = "moderator@gmail.com";
    const password = "Moderator12345";
    setValue("email", email);
    setValue("password", password);
  };
  return (
    <div className="bg-[#eeee] dark:bg-[#0a0a0a]">
      <div className="w-full md:w-10/12 lg:w-9/12 mx-auto flex flex-col-reverse py-10 md:py-20 lg:py-0 lg:flex-row justify-center items-center dark:text-white">
        <Helmet>
          <title>Login - NextGenHunt</title>
        </Helmet>
        {/* image */}
        <div className="flex-1">
          <img
            src={loginImg}
            className="h-[300px] md:h-[600px] lg:h-[calc(100vh-0px)] w-full bg-cover object-cover"
            alt=""
          />
        </div>
        {/* login box */}
        <div className="card flex-1 lg:shrink-0 md:w-9/12 w-11/12 lg:w-fit">
          <button
            className={`  text-black dark:text-white/60 hover:text-btnPrimary mb-4  w-[160px] mx-auto `}
          >
            <Link to={"/"} className="flex justify-center items-center text-lg">
              <FaArrowLeft className="text-xl mr-2" /> Back to home
            </Link>
          </button>
          <h3 className="text-2xl font-bold text-center dark:text-white">
            Sign in to NextGenHunt
          </h3>
          <div className="join mt-4 mx-auto ">
            <button
              onClick={handleAdminLogin}
              className="btn join-item hover:bg-btnPrimary hover:text-white"
            >
              Sign in as Admin
            </button>
            <button
              onClick={handleModeratorLogin}
              className="btn join-item hover:bg-btnPrimary hover:text-white"
            >
              Sign in as moderator
            </button>
          </div>
          <form
            className="card-body w-full lg:w-9/12 mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-control">
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="input rounded-full bg-[#f3f3f3]"
                required
              />
            </div>
            <div className="form-control mt-4 relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message:
                      "Password must include an uppercase letter, a lowercase letter, and a number",
                  },
                })}
                className="input rounded-full bg-[#f3f3f3]"
                required
              />
              <span
                className="absolute top-4 right-5 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                <FaEye />
              </span>
              {error && (
                <p className="text-red-500 mt-4">
                  {error.slice(error.indexOf("(") + 1, error.indexOf(")"))}
                </p>
              )}
              {errors.password && (
                <p className="text-red-500 mt-4">{errors.password.message}</p>
              )}
              <label className="label block text-right mt-4 ">
                <a className="label-text-alt link link-hover text-gray-700 dark:text-gray-400 font-medium">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-2 ">
              <button className="btn bg-btnPrimary text-white rounded-full">
                Login
              </button>
            </div>
            <div className="divider">Or login with</div>
            <SocialLogin />
            <h5 className="text-center py-6 text-gray-600 dark:text-gray-300">
              Don't have an account,{" "}
              <Link to={"/register"}>
                <span className="text-btnPrimary cursor-pointer font-semibold">
                  Sign up now
                </span>
              </Link>
            </h5>
          </form>
        </div>
      </div>
    </div>
  );
};
