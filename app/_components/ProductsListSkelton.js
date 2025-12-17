import { Skeleton } from "../../components/ui/skeleton";

export function ProductsListSkelton() {
  return (
    <div className="grid grid-cols-4 gap-5 mt-10">
      <Skeleton className="h-[300px] w-[250px] rounded-xl" />
      <Skeleton className="h-[300px] w-[250px] rounded-xl" />
      <Skeleton className="h-[300px] w-[250px] rounded-xl" />
      <Skeleton className="h-[300px] w-[250px] rounded-xl" />
      <Skeleton className="h-[300px] w-[250px] rounded-xl" />
      <Skeleton className="h-[300px] w-[250px] rounded-xl" />
      <Skeleton className="h-[300px] w-[250px] rounded-xl" />
      <Skeleton className="h-[300px] w-[250px] rounded-xl" />
      <Skeleton className="h-[300px] w-[250px] rounded-xl" />
      <Skeleton className="h-[300px] w-[250px] rounded-xl" />
      <Skeleton className="h-[300px] w-[250px] rounded-xl" />
      <Skeleton className="h-[300px] w-[250px] rounded-xl" />
    </div>
  );
}
