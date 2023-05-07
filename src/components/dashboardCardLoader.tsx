import Skeleton from "react-loading-skeleton";

export default function DashboardCardLoader() {
  return (
    <div className="border shadow min-h-[10rem] rounded-lg bg-white p-6 mb-5 flex flex-col gap-3">
      <div className="flex items-center gap-3 w-full">
        <Skeleton
          className="h-[3.25rem] w-[3.25rem] py-0"
          baseColor="#f7f4ff"
          highlightColor="#fff"
          duration={1}
        />
      </div>
      <h1 className="text">
        <Skeleton
          className="w-[10rem]"
          baseColor="#f7f4ff"
          highlightColor="#fff"
          duration={1}
        />
      </h1>
      <h1 className="text-3xl font-semibold">
        <Skeleton baseColor="#f7f4ff" highlightColor="#fff" duration={1} />
      </h1>
      <h1 className="text-lg font-semibold">
        <Skeleton baseColor="#f7f4ff" highlightColor="#fff" duration={1} />
      </h1>
    </div>
  );
}
