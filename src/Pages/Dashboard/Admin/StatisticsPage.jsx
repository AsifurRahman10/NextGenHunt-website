import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { BsCartCheck } from "react-icons/bs";
import { CiWallet } from "react-icons/ci";
import { MdPendingActions } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";
import { Loading } from "../../../Component/Share/Loading";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import { useAuth } from "../../../Hooks/useAuth";

export const StatisticsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user, Loading: userLoading } = useAuth();
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

  if (isLoading || userLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h3 className="text-xl font-bold mt-4 text-gray-700">Admin Dashboard</h3>
      <h2 className="text-3xl font-semibold mt-2">
        Welcome back, {user?.displayName}
      </h2>
      <Helmet>
        <title>Admin Dashboard - NextGenHunt</title>
      </Helmet>

      {/* box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 sm:grid-cols-4">
        {/* Total Revenue */}
        <div className="flex items-center bg-white rounded-sm overflow-hidden ">
          <div className="p-4 bg-green-400">
            <CiWallet className="h-12 w-12 text-white" />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Revenue</h3>
            <p className="text-3xl">${data?.totalMoney?.totalMoney}</p>
          </div>
        </div>

        {/* Total Products */}
        <div className="flex items-center bg-white rounded-sm overflow-hidden ">
          <div className="p-4 bg-blue-400">
            <BsCartCheck className="h-12 w-12 text-white" />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Products</h3>
            <p className="text-3xl">{data["Total Product"]}</p>
          </div>
        </div>

        {/* Total Users */}
        <div className="flex items-center bg-white rounded-sm overflow-hidden ">
          <div className="p-4 bg-indigo-400">
            <TbUsersGroup className="h-12 w-12 text-white" />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Users</h3>
            <p className="text-3xl">{data["Total User"]}</p>
          </div>
        </div>

        {/* Pending Products */}
        <div className="flex items-center bg-white rounded-sm overflow-hidden ">
          <div className="p-4 bg-red-400">
            <MdPendingActions className="h-12 w-12 text-white" />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Pending Products</h3>
            <p className="text-3xl">{data.pendingProducts}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* cart */}
        <div className="w-full lg:w-1/2 h-[300px] md:h-[400px] bg-white mt-6 p-4 shadow-lg">
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
        {/* bar */}
        <div className="w-full lg:w-1/2 h-[300px] md:h-[400px] bg-white mt-6 p-4 shadow-lg">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} align="center" />
              <Bar dataKey="value" fill="#8884d8" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
