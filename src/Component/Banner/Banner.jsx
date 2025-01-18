import bannerImg from "../../assets/bannerimg.png";

export const Banner = () => {
  return (
    <div className=" bg-bannerPrimary min-h-screen">
      <div className="flex justify-center items-center w-11/12 lg:w-9/12 mx-auto gap-6 pt-10 flex-col lg:flex-row">
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
              <input type="text" className="grow" placeholder="Search" />
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
            <button className="btn bg-btnPrimary text-white font-medium w-1/4">
              Search
            </button>
          </div>
        </div>

        {/* image div */}
        <div className="flex-1 border-1 block">
          <img src={bannerImg} alt="" />
        </div>
      </div>
    </div>
  );
};
