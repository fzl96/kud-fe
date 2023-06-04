import { Charts } from "./charts";
import type { ProductSale } from "@/types";

type SalesData = {
  name: string;
  revenue: number;
  salesCount: number;
  spend: number;
};

type SummaryData = {
  totalSales: number;
  totalExpenses: number;
  avgTransactionValue: number;
  topSellingProducts: ProductSale[];
};

interface DashboardReportsProps {
  componentRef: React.RefObject<any>;
  year: number;
  monthlySalesData: SalesData[];
  yearlySalesData: SummaryData;
}

export function DashboardReports({
  componentRef,
  year,
  monthlySalesData,
  yearlySalesData: summaryData,
}: DashboardReportsProps) {
  // Dummy data for demonstration
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const inventoryData = {
    stockLevels: 125,
    topSellingItems: ["Product D", "Product E", "Product F"],
    slowMovingItems: ["Product G", "Product H"],
    discrepancies: 5,
  };

  const customerData = {
    demographics: {
      male: 45,
      female: 55,
      other: 5,
    },
    purchaseHistory: 135,
    repeatCustomers: 75,
    loyaltyProgramStats: {
      signups: 120,
      redemptions: 40,
    },
  };

  const financialData = {
    revenue: 180000,
    costs: 95000,
    profitMargin: 0.35,
  };

  const employeeData = {
    salesTargetsAchieved: 80,
    avgTransactionValuePerEmployee: 95.5,
    customerSatisfaction: 4.5,
  };

  const additionalInsightsData = {
    tableTurnoverRate: 3.2,
    popularMenuItems: ["Item X", "Item Y", "Item Z"],
    customerFeedback: {
      positive: 85,
      negative: 15,
    },
  };

  const recommendations = [
    "Optimize marketing strategies to attract more repeat customers.",
    "Analyze slow-moving items and consider offering promotions to boost sales.",
    "Implement employee training programs to improve customer satisfaction.",
  ];

  return (
    <div ref={componentRef} className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-[20rem]">
        <h1 className="text-3xl font-bold mb-6">
          Dokumen Laporan Penjualan - <span>{year}</span>
        </h1>
        <h2 className="text-xl font-semibold mb-4">Pendahuluan</h2>
        <p className="text-gray-700 mb-6 text-justify">
          Selamat datang di laporan untuk Aplikasi Penjualan KUD Jaya Makmur.
          Dokumen ini menyediakan gambaran komprehensif tentang wawasan dan
          metrik utama dari periode pelaporan yang telah ditentukan. Dengan
          menganalisis data yang dikumpulkan oleh sistem point of sale, laporan
          ini bertujuan untuk memberikan wawasan berharga tentang kinerja
          bisnis, tren penjualan, dan perilaku pelanggan.
          <br />
          <br />
          Dalam laporan ini, akan diulas data dari <span>{year}</span>, yang
          mencakup rentang waktu dari Januari hingga Desember. Dengan
          menganalisis periode ini, dapat diidentifikasi pola, tren, dan area
          perbaikan penting yang dapat membantu dalam pengambilan keputusan yang
          lebih terinformasi dan mendukung kesuksesan bisnis.
        </p>
        <h2 className="text-xl font-semibold mb-4">Rangkuman</h2>
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <div className="flex gap-10 items-center justify-between mb-4">
            <div>
              <p className="text-lg font-semibold">Total Pendapatan</p>
              <p className="text-3xl font-bold">
                {formatter.format(summaryData.totalSales)}
              </p>
              <p className="text-sm italic text-gray-600">
                Pendapatan yang dihasilkan sepanjang tahun
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold">Total Pengeluaran</p>
              <p className="text-3xl font-bold">
                {formatter.format(summaryData.totalExpenses)}
              </p>
              <p className="text-sm italic text-gray-600">
                Biaya yang dikeluarkan sepanjang tahun
              </p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Rata-rata Nilai Transaksi</p>
            <p className="text-3xl font-bold">
              {formatter.format(summaryData.avgTransactionValue)}
            </p>
            <p className="text-sm italic text-gray-600">
              Rata-rata jumlah transaksi yang dilakukan pelanggan
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold">
              Barang Paling Banyak Terjual
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {summaryData.topSellingProducts.map((product) => (
                <div key={product.id} className="p-4 bg-gray-200 rounded-lg">
                  <div>
                    <p className="text-xl font-semibold">{product.name}</p>
                    <p className="text-sm italic text-gray-600">
                      {product.quantityCount} unit terjual
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div>
          <p className="text-xl font-semibold mb-2">Sales Analysis</p>
          <table className="mt-4 w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-4 text-lg">Month</th>
                <th className="py-3 px-4 text-lg">Total Sales</th>
                <th className="py-3 px-4 text-lg">Total Expenses</th>
                <th className="py-3 px-4 text-lg">Number of Sales</th>
              </tr>
            </thead>
            <tbody>
              {monthlySalesData.map((monthData) => (
                <tr key={monthData.name} className="border-b">
                  <td className="py-3 px-4 pl-10 text-left">
                    {monthData.name}
                  </td>
                  <td className="py-3 px-4 pl-10">
                    {formatter.format(monthData.revenue)}
                  </td>
                  <td className="py-3 px-4 pl-10">
                    {formatter.format(monthData.spend)}
                  </td>
                  <td className="py-3 px-4 pl-10">{monthData.salesCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <div>
        <h2 className="text-xl font-semibold mb-4">Inventory Analysis</h2>
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="text-gray-700 mb-2">
            Stock Levels: {inventoryData.stockLevels}
          </p>
          <p className="text-gray-700 mb-2">
            Top Selling Items: {inventoryData.topSellingItems.join(", ")}
          </p>
          <p className="text-gray-700 mb-2">
            Slow-Moving Items: {inventoryData.slowMovingItems.join(", ")}
          </p>
          <p className="text-gray-700">
            Discrepancies: {inventoryData.discrepancies}
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-4">Customer Analysis</h2>
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="text-gray-700 mb-2">
            Demographics: Male - {customerData.demographics.male}%, Female -{" "}
            {customerData.demographics.female}%, Other -{" "}
            {customerData.demographics.other}%
          </p>
          <p className="text-gray-700 mb-2">
            Purchase History: {customerData.purchaseHistory} times
          </p>
          <p className="text-gray-700 mb-2">
            Repeat Customers: {customerData.repeatCustomers}
          </p>
          <p className="text-gray-700">
            Loyalty Program: Signups -{" "}
            {customerData.loyaltyProgramStats.signups}, Redemptions -{" "}
            {customerData.loyaltyProgramStats.redemptions}
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-4">Financial Summary</h2>
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="text-gray-700 mb-2">
            Revenue: ${financialData.revenue}
          </p>
          <p className="text-gray-700 mb-2">Costs: ${financialData.costs}</p>
          <p className="text-gray-700">
            Profit Margin: {financialData.profitMargin * 100}%
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-4">Employee Performance</h2>
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="text-gray-700 mb-2">
            Sales Targets Achieved: {employeeData.salesTargetsAchieved}%
          </p>
          <p className="text-gray-700 mb-2">
            Avg. Transaction Value per Employee: $
            {employeeData.avgTransactionValuePerEmployee}
          </p>
          <p className="text-gray-700">
            Customer Satisfaction: {employeeData.customerSatisfaction}/5
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-4">Additional Insights</h2>
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="text-gray-700 mb-2">
            Table Turnover Rate: {additionalInsightsData.tableTurnoverRate}x
          </p>
          <p className="text-gray-700 mb-2">
            Popular Menu Items:{" "}
            {additionalInsightsData.popularMenuItems.join(", ")}
          </p>
          <p className="text-gray-700">
            Customer Feedback: Positive -{" "}
            {additionalInsightsData.customerFeedback.positive}%, Negative -{" "}
            {additionalInsightsData.customerFeedback.negative}%
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
        <ul className="list-disc list-inside mb-6">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="text-gray-700">
              {recommendation}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <p className="text-gray-700">
          For further assistance or clarification, please contact us at [contact
          information].
        </p>
      </div> */}
    </div>
  );
}
