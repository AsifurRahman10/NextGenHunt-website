import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { BsCartCheck } from "react-icons/bs";
import { CiWallet } from "react-icons/ci";
import { MdPendingActions } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";
import { Loading } from "../../../Component/Share/Loading";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";

import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const StatisticsPage = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const res = await axiosSecure(`/statistics`);
      return res.data;
    },
  });
  console.log(data);

  const resultArray = Object.keys(data).map((key) => ({
    name: key,
    value: data[key]?.totalMoney || data[key],
  }));

  const chartData = [
    ...resultArray.filter((item) =>
      ["Total Reviews", "Total Product", "Total User"].includes(item.name)
    ),
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h3 className="text-3xl font-bold mt-4">Admin Dashboard</h3>
      <Helmet>
        <title>Admin Dashboard - NextGenHunt</title>
      </Helmet>

      {/* box */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* revenue */}
        <div className="bg-white p-6 rounded-xl flex-1">
          <div className="flex items-center gap-6 justify-between">
            <div className="">
              <h4 className="text-2xl font-medium mb-4">Total revenue</h4>
              <p className="text-4xl font-bold ">
                $ {data?.totalMoney?.totalMoney}
              </p>
            </div>
            <div>
              <CiWallet className="text-7xl text-btnPrimary" />
            </div>
          </div>
        </div>
        {/* products */}
        <div className="bg-white p-6 rounded-xl flex-1">
          <div className="flex items-center gap-6 justify-between">
            <div className="">
              <h4 className="text-2xl font-medium mb-4">Total Products</h4>
              <p className="text-4xl font-bold ">{data["Total Product"]}</p>
            </div>
            <div>
              <BsCartCheck className="text-7xl text-btnPrimary" />
            </div>
          </div>
        </div>
        {/* user */}
        <div className="bg-white p-6 rounded-xl flex-1">
          <div className="flex items-center gap-6 justify-between">
            <div className="">
              <h4 className="text-2xl font-medium mb-4">Total User</h4>
              <p className="text-4xl font-bold ">{data["Total User"]}</p>
            </div>
            <div>
              <TbUsersGroup className="text-7xl text-btnPrimary" />
            </div>
          </div>
        </div>
        {/* pending product */}
        <div className="bg-white p-6 rounded-xl flex-1">
          <div className="flex items-center gap-6 justify-between">
            <div className="">
              <h4 className="text-2xl font-medium mb-4">Pending Products</h4>
              <p className="text-4xl font-bold ">{data.pendingProducts}</p>
            </div>
            <div>
              <MdPendingActions className="text-7xl text-btnPrimary" />
            </div>
          </div>
        </div>
      </div>

      {/* cart */}
      <div className="w-full lg:w-1/2 h-[300px] md:h-[400px] bg-white mt-6 p-4 shadow-lg rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              height={36}
              align="center"
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
