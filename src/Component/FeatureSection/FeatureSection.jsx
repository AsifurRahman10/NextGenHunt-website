import axios from "axios";
import { CardBoxShape } from "../Share/CardBoxShape";
import { Title } from "../Share/Title";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../Share/Loading";

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

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="pt-10 pb-20 w-11/12 md:w-9/12 mx-auto">
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
          <div
            key={product._id}
            className={`${
              index === featureProduct.length - 1 ? "mt-6 lg:col-start-2" : ""
            }`}
          >
            <CardBoxShape product={product} refetch={refetch} />
          </div>
        ))}
      </div>
    </div>
  );
};
