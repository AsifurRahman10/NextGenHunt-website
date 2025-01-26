import React, { useEffect, useState } from "react";
import { Title } from "../Share/Title";
import axios from "axios";
import { CardBoxShape } from "../Share/CardBoxShape";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../Share/Loading";

export const TrendingProducts = () => {
  const {
    data: trendingProduct = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["trendingItem"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_DB}/trending`);
      return res.data;
    },
  });

  console.log(trendingProduct);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="bg-bannerPrimary pt-10 md:pt-10 pb-20">
      <Title
        title={"Trending Products"}
        para={
          "Check out the top-rated products with the highest votes from the community. Discover the hottest picks and see what’s trending now!"
        }
        align={"left"}
        btn={"block"}
      ></Title>
      <div className="w-11/12 md:w-9/12 lg:w-9/12 mx-auto grid grid-cols-1 lg:grid-cols-3 pt-10 gap-6">
        {trendingProduct.map((product) => (
          <CardBoxShape
            key={product._id}
            product={product}
            refetch={refetch}
          ></CardBoxShape>
        ))}
      </div>
    </div>
  );
};
