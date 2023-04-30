import Skeleton from "react-loading-skeleton";

export default function CreateFormLoader({ number }: { number: number }) {
  return (
    <>
      {[...Array(number)].map((_, i) => (
        <div
          className="flex flex-col py-3  rounded-sm bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-500 focus-within:text-black transition-colors duration-150 "
          key={i}
        >
          <Skeleton height={2} />
        </div>
      ))}
    </>
  );
}
