import PageTitle from "../components/pageTitle";
import useSWR from "swr";
import { dashboardApiEndpoint, getDashboard } from "../api/dashboardApi";
import { useState, useMemo } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Charts from "../components/charts";
import DashboardCard from "../components/dashboardCard";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Dashboard() {
  // get current year
  const currentYear = new Date().getFullYear();
  const getMonth = new Date().getMonth() + 1;
  console.log(new Date());
  const [year, setYear] = useState(currentYear);
  const {
    data,
    error,
    mutate,
    isLoading: loading,
  } = useSWR([dashboardApiEndpoint, year], () => getDashboard(year));
  const [open, setOpen] = useState(false);
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const salesData = useMemo(() => {
    const sales = data?.map((item: any) => ({
      name: item.month,
      revenue: item.revenue,
      salesCount: item.salesCount,
      spend: item.spending,
    }));

    const salesWithZero = [];

    for (let i = 1; i <= 12; i++) {
      const monthData = sales?.find((item: any) => item.name === i);

      if (monthData) {
        const monthName = monthNames[i - 1];
        salesWithZero.push({
          name: monthName,
          revenue: monthData.revenue,
          salesCount: monthData.salesCount,
          spend: monthData.spend,
        });
      } else {
        const monthName = monthNames[i - 1];
        salesWithZero.push({
          name: monthName,
          revenue: 0,
          salesCount: 0,
          spend: 0,
        });
      }
    }

    return salesWithZero;
  }, [data]);

  const currentMonthData = useMemo(() => {
    return data?.find((item: any) => item.month === getMonth);
  }, [data]);

  console.log(data);

  return (
    <div>
      <PageTitle title="Dashboard" loading={loading} setOpen={setOpen} />
      <select
        name="year"
        id="year"
        defaultValue={currentYear}
        onChange={(e) => {
          setYear(Number(e.target.value));
          mutate();
        }}
      >
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
      </select>
      <div>
        {loading ? (
          <ClipLoader />
        ) : (
          <pre>{/* <code>{JSON.stringify(data, null, 2)}</code> */}</pre>
        )}
      </div>
      <div className="px-10 grid grid-cols-3 gap-5 w-full">
        {data && (
          <>
            <DashboardCard
              title="Pendapatan Bulan ini"
              content={formatter.format(currentMonthData?.revenue || 0)}
            />
            <DashboardCard
              title="Penjualan Bulan ini"
              content={currentMonthData?.salesCount || 0}
            />
            <DashboardCard
              title="Pengeluaran Bulan ini"
              content={formatter.format(currentMonthData?.spending || 0)}
            />
          </>
        )}
      </div>
      <div className="bg-white p-7 mx-10 rounded-lg border shadow">
        <h1 className="mb-10 text-xl font-semibold">Pendapatan tahun {year}</h1>
        <Charts data={salesData} />
      </div>
    </div>
  );
}
