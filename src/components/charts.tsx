import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: any;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip p-4 bg-white border-2 rounded-lg flex flex-col gap-2">
        <p className="label">{`${payload[0].payload.name}`}</p>
        <p className="revenue text-[#a285e1]">
          Pendapatan:{" "}
          <span className="font-semibold rounded-md px-2 py-1 bg-[#e5defe] text-[#a285e1]">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(payload[0].payload.revenue)}
          </span>
        </p>
        <p className="spend text-green-600">
          Pengeluaran:{" "}
          <span className="font-semibold rounded-md py-1 px-2 bg-[#e1f8ea] text-green-600">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(payload[1].payload.spend)}
          </span>
        </p>
      </div>
    );
  }

  return null;
};

export function Charts({ data }: Props) {
  const formatValue = (value: number) => {
    if (value < 1000000) return (value / 1000).toFixed(0) + "RB";
    if (value < 1000000000) return value / 1000000 + "JT";
    return (value / 1000000000).toFixed(0) + "M";
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        {/* <CartesianGrid horizontal={true} vertical={false} /> */}
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          dy={5}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${formatValue(value)}`}
        />
        <Tooltip
          wrapperStyle={{ outline: "none" }}
          content={<CustomTooltip />}
        />
        <Legend />
        <Line
          name="Pendapatan"
          type="monotone"
          dataKey="revenue"
          stroke="#a285e1"
          strokeWidth={3}
          fill="#a285e1"
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
  );
}
