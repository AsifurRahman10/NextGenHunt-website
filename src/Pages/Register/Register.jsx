import { FaEye } from "react-icons/fa";
import login from "../../assets/login.jpg";
import { SocialLogin } from "../../Component/Share/SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { uploadImage } from "../../Api/Utils";
import { Helmet } from "react-helmet-async";

export const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const { register: registerFn, updateUser, setLoading } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    const imageFile = data.image[0];
    try {
      await registerFn(data.email, data.password);
      const image = await uploadImage(imageFile);
      await updateUser(data.name, image);
      const userData = {
        email: data.email,
        name: data.name,
        image: image,
        role: "user",
        userType: "free",
      };
      await axios.post(`${import.meta.env.VITE_DB}/userInfo`, userData);
      navigate("/");
      Swal.fire({
        title: "Account Created Successfully",
        text: "Your account has been created successfully",
        icon: "success",
      });
      setLoading(false);
    } catch (error) {
      const errorText = error.message.slice(15).replace(/[()]/g, "");
      setError(errorText);
    }
  };

  return (
    <div className="bg-[#eee] dark:bg-[#0a0a0a]">
      <div className="w-11/12 md:w-10/12 lg:w-9/12 mx-auto flex flex-col-reverse py-10 md:py-20 lg:py-0 lg:flex-row justify-center items-center">
        <Helmet>
          <title>Register - NextGenHunt</title>
        </Helmet>
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
          <h3 className="text-2xl font-bold text-center mb-8 dark:text-white w-9/12 mx-auto md:w-full">
            Join our community, register to{" "}
            <span className="text-btnPrimary">NextGenHunt</span>
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body w-full lg:w-9/12 mx-auto p-0 md:p-4"
          >
            {/* name */}
            <div className="form-control mt-2">
              <input
                {...register("name")}
                type="text"
                placeholder="Enter you Name"
                className="input rounded-full bg-[#f3f3f3]"
                required
              />
            </div>
            {/* email */}
            <div className="form-control mt-2">
              <input
                {...register("email")}
                type="email"
                placeholder="Enter you email"
                className="input rounded-full bg-[#f3f3f3]"
                required
              />
            </div>
            {/* upload photo */}
            <div className="form-control mt-2">
              <input
                {...register("image")}
                id="example1"
                type="file"
                className="mt-2 block w-full text-sm py-2 file:mr-4 bg-[#f3f3f3] rounded-full file:rounded-md file:ml-3 file:border-0 file:bg-btnPrimary file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-500 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
              />
            </div>

            {/* password */}
            <div className="form-control relative mt-2">
              <input
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
            </div>
            {errors.password && (
              <p className="text-red-500 mt-4">{errors.password.message}</p>
            )}
            {error && <p className="text-red-500 mt-4">{error}</p>}
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
    </div>
  );
};
