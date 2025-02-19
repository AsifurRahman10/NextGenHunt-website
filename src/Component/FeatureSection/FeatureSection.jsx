import axios from "axios";
import { Title } from "../Share/Title";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../Share/Loading";
import { CardForFeature } from "../Share/CardForFeature";
import { motion } from "motion/react";

export const FeatureSection = () => {
  const {
    data: featureProduct = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["item"],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_DB}/featureProducts`);
      return res.data;
    },
  });
  const featurePage = true;

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="pt-5 lg:pt-10 pb-10 lg:pb-20 w-11/12 md:w-9/12 mx-auto">
      <Title
        title={"Featured Products"}
        para={
          " Discover the latest and most exciting tech products handpicked for you. Explore cutting-edge web apps, AI tools, software, games, and mobile apps that are shaping the future of technology."
        }
        align={"center"}
        btn={"hidden"}
      ></Title>

      {/* card container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {featureProduct.map((product, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: index * 0.2,
            }}
            key={product._id}
            className={`${
              index === featureProduct.length - 1 ? "mt-6 lg:col-start-2" : ""
            }`}
          >
            <CardForFeature
              featurePage={featurePage}
              product={product}
              refetch={refetch}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
