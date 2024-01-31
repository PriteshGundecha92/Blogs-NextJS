import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 m-5">
      <Skeleton className="h-[240px] w-[400px] bg-slate-300 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-[400px] bg-slate-300" />
        <Skeleton className="h-6 w-[400px] bg-slate-300" />
        <Skeleton className="h-6 w-[300px] bg-slate-300" />
        <Skeleton className="h-6 w-[250px] bg-slate-300" />
      </div>
    </div>
  );
}
