import { useEffect, useState } from "react";
import { Title } from "../Share/Title";
import axios from "axios";
import BlogCard from "../Share/BlogCard";

export const LatestBlog = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/blogs/latest").then((res) => {
      setLatestBlogs(res.data);
    });
  }, []);
  return (
    <div className="w-11/12 md:w-9/12 mx-auto pt-5 lg:pt-10 pb-10 lg:py-10 ">
      <Title
        title={"Our latest Blogs"}
        para={
          "Stay updated with our latest blogs featuring insightful articles, expert opinions, and trending topics. Explore fresh content to stay informed and inspired!"
        }
        align={"center"}
        btn={"hidden"}
      ></Title>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {latestBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};
