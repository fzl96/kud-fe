interface Props {
  title: string;
  content: any;
  icon: React.ReactNode;
  status: any;
}

export default function DashboardCard({ title, content, icon, status }: Props) {
  const convertToString = (value: any) => {
    if (isNaN(value)) {
      return "0%";
    }
    const sign = status > 0 ? "+" : "-";
    const absPercentageDiff = Math.abs(status);
    return `${sign} ${absPercentageDiff.toFixed(2)}%`;
  };

  return (
    <div className="border shadow min-h-[10rem] rounded-lg bg-white p-6 mb-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="bg-[#f7f4ff] p-4 rounded-lg text-2xl text-[#a285e1]">
          {icon}
        </div>
      </div>
      <h1 className="text">{title}</h1>
      <h1 className="text-3xl font-semibold">{content}</h1>
      <h1 className="flex items-center gap-2">
        <span
          className={`font-semibold py-[0.125rem] px-2 rounded-md ${
            status > 0
              ? "bg-[#e1f8ea] text-green-600"
              : isNaN(status)
              ? "bg-[#fcf4db] text-[#ff8a00]"
              : "bg-[#fbdddd] text-[#e96c6c]"
          }`}
        >
          {convertToString(status)}
        </span>
        dari Bulan Lalu
      </h1>
    </div>
  );
}
