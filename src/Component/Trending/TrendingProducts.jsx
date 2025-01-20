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

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="bg-bannerPrimary py-10">
      <Title
        title={"Trending Products"}
        para={
          "Check out the top-rated products with the highest votes from the community. Discover the hottest picks and see what’s trending now!"
        }
        align={"left"}
        btn={"block"}
      ></Title>
      <div className="w-11/12 lg:w-9/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-10 gap-6">
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
