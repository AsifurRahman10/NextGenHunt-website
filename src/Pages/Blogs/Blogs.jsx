import { useEffect, useState } from "react";
import BlogCard from "../../Component/Share/BlogCard";
import img from "../../assets/couponBg.jpg";
import axios from "axios";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_DB}/blogs`).then((res) => {
      setBlogs(res.data);
    });
  }, []);
  // const blog = {
  //   image: img,
  //   productName: "Awesome Product",
  //   product_description:
  //     "This is an amazing product that solves all your problems with ease.",
  //   externalLinks: [
  //     {
  //       id: "7",
  //       text: "https://zoom.us",
  //     },
  //   ],
  //   allTag: [
  //     {
  //       id: "1",
  //       text: "Development",
  //     },
  //     {
  //       id: "2",
  //       text: "Git",
  //     },
  //     {
  //       id: "3",
  //       text: "Open Source",
  //     },
  //   ],
  //   userName: "JohnDoe",
  //   email: "johndoe@example.com",
  //   userPhoto: "https://example.com/user.jpg",
  //   _id: "1234567890abcdef",
  // };
  return (
    <div className="w-11/12 lg:w-9/12 mx-auto">
      {/* title part */}
      <div className="text-center py-[4rem]">
        <h3 className="text-5xl font-bold mb-4">
          Tech Blog & <span className="text-btnPrimary">Discussions</span>
        </h3>
        <p className="text-lg w-10/12 mx-auto text-gray-700 font-medium">
          Stay updated with the latest technology trends, AI breakthroughs, and
          software innovations through our Tech Blog. We cover everything from
          emerging startups and cutting-edge tools to in-depth product analyses
          and industry insights.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 pb-10">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
