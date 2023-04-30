import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from "recharts";

interface Props {
  data: any;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip p-4 bg-white border-2 rounded-lg flex flex-col gap-2">
        <p className="label">{`${payload[0].payload.name}`}</p>
        <p className="revenue text-[#8884d8]">
          Pendapatan:{" "}
          <span className="font-semibold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(payload[0].payload.revenue)}
          </span>
        </p>
        <p className="spend text-[#82ca9d]">
          Pengeluaran:{" "}
          <span className="font-semibold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(payload[1].payload.spend)}
          </span>
        </p>
      </div>
    );
  }

  return null;
};

export default function Charts({ data }: Props) {
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid horizontal={true} vertical={false} /> */}
          <XAxis dataKey="name" axisLine={false} dy={10} />
          <YAxis axisLine={false} dx={-5} />
          <Tooltip
            wrapperStyle={{ outline: "none" }}
            content={<CustomTooltip />}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#8884d8"
            strokeWidth={3}
            fill="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="spend"
            stroke="#82ca9d"
            strokeWidth={3}
            fill="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
