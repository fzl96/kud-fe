interface Props {
  content: any;
  icon?: any;
  status: any;
}

export function DashboardCard({ content, icon, status }: Props) {
  const convertToString = (value: any) => {
    if (isNaN(value)) {
      return "0%";
    }
    const sign = status > 0 ? "+" : status === 0 ? "" : "-";
    const absPercentageDiff = Math.abs(status);
    return `${sign} ${absPercentageDiff.toFixed(2)}%`;
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold">{content}</h1>
      <h1 className="flex items-center gap-2">
        <span
          className={`font-semibold text-sm py-[0.125rem] px-2 rounded-md ${
            status > 0
              ? "bg-[#e1f8ea] text-green-600"
              : isNaN(status) || status === 0
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
