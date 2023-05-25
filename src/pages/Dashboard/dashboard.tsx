import useSWR from "swr";
import { dashboardApiEndpoint, getDashboard } from "@/lib/api/dashboard";
import { useState, useMemo } from "react";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { Charts } from "@/components/charts";
import { Card } from "@/components/card";
import { DashboardCard } from "@/components/dashboard-card-content";
import { YearSelect } from "@/components/year-select";

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
  const { auth } = useAuth();
  // const componentRef = useRef<any>(null);
  const currentYear = new Date().getFullYear();
  const getMonth = new Date().getMonth() + 1;
  const [year, setYear] = useState<number>(currentYear);
  const { data } = useSWR([dashboardApiEndpoint, year], () =>
    getDashboard(year, auth.accessToken)
  );

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

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
    <div className="flex flex-col">
      <PageTitle heading="Dashboard">
        <div className="flex items-center mt-2 gap-3">
          <YearSelect year={year} setYear={setYear} />
          <Button>Tambah</Button>
        </div>
      </PageTitle>
      <div className="mt-5 md:px-2 grid grid-cols-1 md:grid-cols-3 md:gap-3">
        <Card title="Pendapatan Bulan Ini">
          <DashboardCard
            content={formatter.format(currentMonthData?.revenue || 0)}
            status={currentMonthData?.revenueCompare}
          />
        </Card>
        <Card title="Penjualan Bulan Ini">
          <DashboardCard
            content={currentMonthData?.salesCount || 0}
            status={currentMonthData?.salesCompare}
          />
        </Card>
        <Card title="Pengeluaran Bulan Ini">
          <DashboardCard
            content={formatter.format(currentMonthData?.spend || 0)}
            status={currentMonthData?.spendCompare}
          />
        </Card>
      </div>
      <div className="md:px-2 mt-4">
        <Card>
          <Charts data={salesData} />
        </Card>
      </div>
    </div>
  );
}
