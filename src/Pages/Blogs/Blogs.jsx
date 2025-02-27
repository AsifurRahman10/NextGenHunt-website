import { useEffect, useState } from "react";
import BlogCard from "../../Component/Share/BlogCard";
import { motion } from "motion/react";
import axios from "axios";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_DB}/blogs`).then((res) => {
      setBlogs(res.data);
    });
  }, []);
  return (
    <div className="w-11/12 lg:w-9/12 mx-auto dark:text-white">
      {/* title part */}
      <div className="text-center py-[2rem] md:pt-[4rem] lg:py-[4rem]">
        <h3 className="text-3xl lg:text-5xl font-bold mb-4">
          Tech Blog & <span className="text-btnPrimary">Discussions</span>
        </h3>
        <p className="text-sm lg:text-lg lg:w-10/12 mx-auto text-gray-700 dark:text-gray-300 font-medium">
          Stay updated with the latest technology trends, AI breakthroughs, and
          software innovations through our Tech Blog. We cover everything from
          emerging startups and cutting-edge tools to in-depth product analyses
          and industry insights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-6 pb-10">
        {blogs.map((blog, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: index * 0.2,
            }}
            key={blog._id}
          >
            <BlogCard blog={blog} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
