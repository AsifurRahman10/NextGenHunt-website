import axios from "axios";
import { CardBoxShape } from "../Share/CardBoxShape";
import { Title } from "../Share/Title";
import { useEffect, useState } from "react";

export const FeatureSection = () => {
  const [featureProduct, setFeatureProduct] = useState([]);
  useEffect(() => {
    axios(`${import.meta.env.VITE_DB}/featureProducts`).then((res) => {
      setFeatureProduct(res.data);
    });
  }, []);

  return (
    <div className="py-10 w-11/12 md:w-9/12 mx-auto">
      <Title
        title={"Featured Products"}
        para={
          " Discover the latest and most exciting tech products handpicked for you. Explore cutting-edge web apps, AI tools, software, games, and mobile apps that are shaping the future of technology."
        }
      ></Title>

      {/* card container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {featureProduct.map((product) => (
          <CardBoxShape key={product._id} product={product}></CardBoxShape>
        ))}
      </div>
    </div>
  );
};
