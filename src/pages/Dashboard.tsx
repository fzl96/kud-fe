import useSWR from "swr";
import { dashboardApiEndpoint, getDashboard } from "../api/dashboardApi";
import { useState, useMemo, useRef } from "react";
import Charts from "../components/charts";
import DashboardCard from "../components/dashboardCard";
import { RiShoppingBagLine } from "react-icons/ri";
import { SiExpensify } from "react-icons/si";
import CustomYearSelect from "../components/customYearSelect";
import { useAuth } from "../context/authContext";
import { HiOutlineDocumentReport } from "react-icons/hi";
import DashboardCardLoader from "../components/dashboardCardLoader";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import MyDocument from "../components/document";
import { BsBag } from "react-icons/bs";

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

const Dashboard = () => {
  const { auth } = useAuth();
  const componentRef = useRef<any>(null);
  const currentYear = new Date().getFullYear();
  const getMonth = new Date().getMonth() + 1;
  const [year, setYear] = useState(currentYear);
  const {
    data,
    error,
    mutate,
    isLoading: loading,
  } = useSWR([dashboardApiEndpoint, year], () =>
    getDashboard(year, auth.accessToken)
  );
  const [open, setOpen] = useState(false);
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
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

  const compare = (current: number, previous: number) => {
    const prev = previous === 0 || isNaN(previous) ? 1 : previous;
    const percentageDiff = ((current + 1 - prev) / prev) * 100;
    const rounded = Math.round(percentageDiff * 100) / 100;
    // console.log(
    //   `current : ${current}, previous : ${prev}, diff : ${percentageDiff} rounded : ${rounded}`
    // );
    return rounded;
  };

  const currentMonthData = useMemo(() => {
    const previousMonthData = data?.find(
      (item: any) => item.month === getMonth - 1
    );
    const currentMonthData = data?.find((item: any) => item.month === getMonth);
    const salesCompare = compare(
      currentMonthData?.salesCount,
      previousMonthData?.salesCount
    );
    const revenueCompare = compare(
      currentMonthData?.revenue,
      previousMonthData?.revenue
    );
    const spendCompare = compare(
      currentMonthData?.spending,
      previousMonthData?.spending
    );

    return {
      revenue: currentMonthData?.revenue,
      salesCount: currentMonthData?.salesCount,
      spend: currentMonthData?.spending,
      salesCompare: salesCompare,
      revenueCompare: revenueCompare,
      spendCompare: spendCompare,
    };
  }, [data]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between mx-5 md:mx-10 md:items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex gap-3">
          <CustomYearSelect year={year} setYear={setYear} />
          <div
            ref={componentRef}
            className={`documentsToPrint marker:absolute z-[-10] inset-0`}
          >
            <MyDocument />
          </div>
          <ReactToPrint
            trigger={() => (
              <button
                className={`flex items-center text-white px-4 py-3 text-[0.9063rem] rounded-[0.25rem] bg-[#a285e1] font-semibold gap-2 hover:bg-[#bdabe2] transition-colors duration-150 ${
                  loading ? "cursor-not-allowed bg-[#2d2d30]" : "cursor-pointer"
                }}`}
                onClick={handlePrint}
                disabled={loading}
              >
                <span className="text-lg">
                  <HiOutlineDocumentReport />
                </span>
                Unduh laporan
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>
      <div className="px-5 md:px-10 mt-5 grid grid-cols-1 md:grid-cols-3 md:gap-3 w-full">
        {(loading && !data) || error ? (
          <>
            {Array.from(Array(3).keys()).map((item) => (
              <DashboardCardLoader key={item} />
            ))}
          </>
        ) : (
          <>
            <DashboardCard
              title="Pendapatan Bulan ini"
              content={formatter.format(currentMonthData?.revenue || 0)}
              icon={<BsBag />}
              status={currentMonthData?.revenueCompare}
            />
            <DashboardCard
              title="Penjualan Bulan ini"
              content={currentMonthData?.salesCount || 0}
              icon={<RiShoppingBagLine />}
              status={currentMonthData?.salesCompare}
            />
            <DashboardCard
              title="Pengeluaran Bulan ini"
              content={formatter.format(currentMonthData?.spend || 0)}
              icon={<SiExpensify />}
              status={currentMonthData?.spendCompare}
            />
          </>
        )}
      </div>
      <div className="bg-white p-7 mx-5 md:mx-10 rounded-lg border shadow mb-5 md:mb-0">
        <h1 className="mb-10 text-xl">
          Pendapatan dan Pengeluaran tahun {year}
        </h1>
        <Charts data={salesData} />
      </div>
    </div>
  );
};

export default Dashboard;
