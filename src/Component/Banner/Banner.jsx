import bannerImg from "../../assets/bannerimg.png";
import { motion } from "motion/react";
import circle from "../../assets/hero-circle-2.png";
import dot from "../../assets/hero-dot.png";
import square from "../../assets/hero-square.png";
import square2 from "../../assets/hero-square-2.png";
import triangle from "../../assets/hero-triangle.png";
import { Link } from "react-router-dom";
import { AnimatedBtn } from "../Share/AnimatedBtn";

export const Banner = () => {
  return (
    <div className="bg-bannerPrimary min-h-[calc(100vh-78px)] pt-0 lg:pt-20 relative overflow-hidden">
      <div className="flex justify-center items-center w-11/12 lg:w-9/12 mx-auto gap-6 py-10 mt-0 md:mt-5 lg:mt-0 lg:py-0 pt-10 flex-col lg:flex-row relative z-10">
        {/* text div */}
        <div className="flex-1 space-y-4 lg:space-y-6">
          <h2 className="text-4xl md:text-6xl font-semibold">
            Discover the Latest{" "}
            <span className="text-btnPrimary">Tech Products</span>
          </h2>
          <p className="text-sm text-gray-600 font-medium">
            Join a vibrant community of tech enthusiasts, where you can explore
            and share the latest web apps, AI tools, software, games, and mobile
            apps. Whether you're a creator or a user, find exciting new tech
            products and contribute to the growing ecosystem.
          </p>
          {/* search */}
          <div className="flex gap-3 lg:gap-6 items-center">
            <label className="input input-bordered flex items-center gap-2 w-9/12">
              <input
                // onChange={handleChange}
                type="text"
                className="grow"
                placeholder="Search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <Link to={"/products"} className="">
              <button className="relative group cursor-pointer text-sky-50  overflow-hidden h-10 w-36 rounded-md bg-btnPrimary p-2 flex justify-center items-center font-extrabold">
                <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#5030ce]"></div>
                <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-32 h-32 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#452ab0]"></div>
                <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-24 h-24 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#37228b]"></div>
                <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-14 h-14 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#2b1a6c]"></div>
                <p className="z-10 flex justify-center items-center gap-2 font-semibold">
                  Search
                </p>
              </button>
            </Link>
          </div>
        </div>

        {/* image div */}
        <div className="flex-1 border-1 block">
          <img className="" src={bannerImg} alt="" />
        </div>
      </div>
      {/* Animations */}
      <div className="absolute inset-0 z-0">
        <motion.img
          animate={{ y: [0, -60, 0] }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          src={circle}
          alt=""
          className="absolute right-52 bottom-1/4 z-[-1]"
        />
        <motion.img
          animate={{ y: [40, -60, 0] }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          src={dot}
          alt=""
          className="absolute right-1/3 top-1/3 z-[-1]"
        />
        <motion.img
          animate={{ x: [100, 160, 100] }}
          transition={{
            duration: 16,
            repeat: Infinity,
          }}
          src={square}
          alt=""
          className="absolute right-[950px] bottom-1/4 z-[-1]"
        />
        <motion.img
          animate={{ rotate: 360 }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear",
          }}
          src={square2}
          alt=""
          className="absolute left-1/2 bottom-1/2 z-[-1]"
        />
        <motion.img
          animate={{ rotate: [0, 360, 0, -360] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          src={triangle}
          alt=""
          className="absolute left-32 top-1/4 z-[-1]"
        />
      </div>
    </div>
  );
};
