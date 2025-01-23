import { FaEye } from "react-icons/fa";
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
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
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
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="w-11/12 md:w-10/12 lg:w-9/12 mx-auto flex flex-col-reverse my-10 md:my-20 lg:my-0 lg:flex-row justify-center items-center">
      <Helmet>
        <title>Login - NextGenHunt</title>
      </Helmet>
      {/* image */}
      <div className="flex-1">
        <img
          src={loginImg}
          className="h-[600px] md:h-[600px] lg:h-[calc(100vh-0px)] w-full bg-cover object-cover"
          alt=""
        />
      </div>
      {/* login box */}
      <div className="card flex-1 lg:shrink-0 md:w-9/12 w-11/12 lg:w-fit">
        <h3 className="text-2xl font-bold text-center">
          Sign in to NextGenHunt
        </h3>
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
            {errors.password && (
              <p className="text-red-500 mt-4">{errors.password.message}</p>
            )}
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
              Login
            </button>
          </div>
          <div className="divider">Or login with</div>
          <SocialLogin></SocialLogin>
          <h5 className="text-center py-6 text-gray-600">
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
  );
};
