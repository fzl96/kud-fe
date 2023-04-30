interface Props {
  title: string;
  content: any;
}

export default function DashboardCard({ title, content }: Props) {
  return (
    <div className="border shadow h-40 rounded-lg bg-white p-6 mb-5 flex flex-col gap-3">
      <h1 className="text">{title}</h1>
      <h1 className="text-3xl font-semibold">{content}</h1>
    </div>
  );
}
