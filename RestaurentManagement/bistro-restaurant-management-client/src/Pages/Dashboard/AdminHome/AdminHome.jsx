import {useQuery} from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie,  Legend} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminHome = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const {data: stats = []} = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const {data: chartData = []} = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  ///Custom shape for the bar charts
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const {fill, x, y, width, height} = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  //custom shape for the pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = chartData.map(data=>{
    return {name: data.category, value: data.revenue}
  })

  return (
    <div>
      <h2 className="text-3xl">
        <span>Hi, Welcome </span>
        {user?.displayName ? user.displayName : "Back"}
      </h2>

      <div className="text-center">
        <div className="stats stats-vertical w-full lg:stats-horizontal shadow mt-10">
          <div className="stat bg-gradient-to-r from-indigo-500">
            <div className="stat-title">Revenue</div>

            <div className="stat-value">${stats.revenue}</div>
          </div>

          <div className="stat bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="stat-title">Users</div>
            <div className="stat-value">{stats.users}</div>
            {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
          </div>

          <div className="stat bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="stat-title">Orders</div>
            <div className="stat-value">{stats.orders}</div>
            {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
          </div>

          <div className="stat bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
            <div className="stat-title">Menu Items</div>
            <div className="stat-value">{stats.menuItems}</div>
            {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center">
        <div className="w-1/2">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{position: "top"}}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="w-1/2">
            
        <PieChart width={600} height={600}>
            
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={200}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          
        </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
