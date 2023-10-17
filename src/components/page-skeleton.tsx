import { Skeleton } from "@/components/ui/skeleton";

export function PageSkeleton({ title }: { title: string }) {
  return (
    <div className="">
      <Skeleton className="h-10 w-1/5" />
      <Skeleton className="h-10 w-[37%] mt-8" />
      <div className="mt-4 flex flex-col gap-8">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
