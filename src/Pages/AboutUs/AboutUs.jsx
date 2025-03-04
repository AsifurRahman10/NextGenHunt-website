import mission from "../../assets/misson.svg";
import vision from "../../assets/vision.svg";
import { CiGlobe } from "react-icons/ci";
import { IoPeopleOutline, IoShareSocialOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import CountUp from "react-countup";
import { motion } from "motion/react";

export const AboutUs = () => {
  return (
    <div className="w-11/12 lg:w-9/12 mx-auto dark:text-white md:pb-10">
      <div className="text-center py-[2rem] md:pt-[4rem] lg:py-[4rem] lg:pt-[8rem]">
        <h3 className="text-3xl lg:text-5xl font-bold mb-4">
          About <span className="text-btnPrimary">NextGen Hunt</span>
        </h3>
        <p className="text-sm lg:text-lg lg:w-10/12 mx-auto text-gray-700 dark:text-gray-300 font-medium">
          NextGen Hunt is your go-to platform for discovering the latest in
          technology, including web apps, AI tools, software, games, and mobile
          apps. Our mission is to help users stay updated with the best products
          and innovations in the tech world. From featured products to trending
          tech and insightful blogs, we provide a space for users to explore,
          review, and engage with the tools that shape the future of technology.
          Join us as we bring together the brightest minds and the most exciting
          new tech in one place.
        </p>
      </div>

      {/* mission */}
      <div className="flex flex-col md:flex-row md:items-center mb-6 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2,
          }}
          className="flex-1 w-full text-center md:text-left lg:w-9/12 space-y-3"
        >
          <h3 className="text-3xl font-bold">Our Mission</h3>
          <p className="font-medium text-gray-600 dark:text-gray-300">
            At <span className="text-btnPrimary">NextGen Hunt</span>, our
            mission is to provide a platform where users can discover, share,
            and explore the latest technology. We aim to connect tech
            enthusiasts, developers, and creators to stay ahead of trends and
            foster innovation.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2,
          }}
          className="flex-1"
        >
          <img className="md:w-2/3 ml-auto" src={mission} alt="" />
        </motion.div>
      </div>
      {/* vision */}
      <div className="flex flex-col md:flex-row-reverse text-center md:text-left items-center mb-6 gap-4">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2,
          }}
          className="flex-1 lg:w-9/12 space-y-3"
        >
          <h3 className="text-3xl font-bold">Our Vision</h3>
          <p className="font-medium text-gray-600 dark:text-gray-300">
            We envision <span className="text-btnPrimary">NextGen</span> Hunt as
            the leading destination for tech discovery, empowering users with
            tools, insights, and a collaborative community to make informed
            decisions about emerging technologies, while fostering innovation
            and knowledge sharing across the global tech landscape.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2,
          }}
          className="flex-1"
        >
          <img className="w-full lg:w-2/3 mr-auto" src={vision} alt="" />
        </motion.div>
      </div>

      {/* what we offer */}
      <div className="mb-10 md:mb-20">
        <h4 className="text-3xl font-semibold text-center">
          What You Can Get from NextGen Hunt
        </h4>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10 lg:mt-16  justify-between gap-8 lg:gap-0"
        >
          {/* 1st card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6 },
              },
            }}
            className="w-full md:w-64 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden mx-auto"
          >
            <div className="w-24 h-24 bg-btnPrimary rounded-full absolute -right-5 -top-7">
              <p className="absolute bottom-6 left-7 text-white text-2xl">01</p>
            </div>
            <div className=" w-12">
              <CiGlobe className="text-5xl text-btnPrimary" />
            </div>
            <h1 className="font-bold text-xl text-black ">Discover New Tech</h1>
            <p className="text-sm text-zinc-500 leading-6">
              Stay updated on the latest software, apps, and AI tools.
            </p>
          </motion.div>

          {/* 2nd card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6 },
              },
            }}
            className="w-full md:w-64 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden mx-auto"
          >
            <div className="w-24 h-24 bg-btnPrimary rounded-full absolute -right-5 -top-7">
              <p className="absolute bottom-6 left-7 text-white text-2xl">02</p>
            </div>
            <div className=" w-12">
              <IoPeopleOutline className="text-5xl text-btnPrimary" />
            </div>
            <h1 className="font-bold text-xl text-black">
              Engage with the Community
            </h1>
            <p className="text-sm text-zinc-500 leading-6">
              Vote on products, leave reviews, and engage in discussions with
              other users and tech enthusiasts.
            </p>
          </motion.div>

          {/* 3nd card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6 },
              },
            }}
            className="w-full md:w-64 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden mx-auto"
          >
            <div className="w-24 h-24 bg-btnPrimary rounded-full absolute -right-5 -top-7">
              <p className="absolute bottom-6 left-7 text-white text-2xl">03</p>
            </div>
            <div className=" w-12">
              <AiOutlineProduct className="text-5xl text-btnPrimary" />
            </div>
            <h1 className="font-bold text-xl text-black">
              Submit and Share Products
            </h1>
            <p className="text-sm text-zinc-500 leading-6">
              As a premium user, submit your own tech products and share them
              with a wider audience.
            </p>
          </motion.div>

          {/* 4nd card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6 },
              },
            }}
            className="w-full md:w-64 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden mx-auto"
          >
            <div className="w-24 h-24 bg-btnPrimary rounded-full absolute -right-5 -top-7">
              <p className="absolute bottom-6 left-7 text-white text-2xl">04</p>
            </div>
            <div className=" w-12">
              <IoShareSocialOutline className="text-5xl text-btnPrimary" />
            </div>
            <h1 className="font-bold text-xl text-black">
              Stay Informed with Blogs
            </h1>
            <p className="text-sm text-zinc-500 leading-6">
              Read insightful articles and blogs that keep you informed about
              tech trends, product updates, and industry news.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* countdown */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-20 text-center mb-10 lg:mb-20">
        <div className="bg-[#3a3afc0f] dark:bg-[#613cfc] p-10 font-bold">
          <p className="mb-2">LAUNCHED IN</p>
          <CountUp
            end={2021}
            className="text-5xl text-btnPrimary dark:text-gray-100"
          />
        </div>
        <div className="bg-[#17a43f0f] dark:bg-[#17a43fbd] p-10 font-bold">
          <p className="mb-2">COMMUNITY OF</p>
          <CountUp
            end={2000}
            className="text-5xl text-[#17a43f] dark:text-[#d0ffdd]"
          />{" "}
          <span className="text-4xl">+</span>
        </div>
        <div className="bg-[#e84a910f] dark:bg-[#e84a919b] p-10 font-bold md:col-span-3 lg:col-span-1 place-self-center w-full md:w-1/2 lg:w-full">
          <p className="mb-2 uppercase">Product Listed</p>
          <CountUp
            end={400}
            className="text-5xl text-[#7b2049f3] dark:text-[#ff69adf3]"
          />
        </div>
      </div>
    </div>
  );
};
