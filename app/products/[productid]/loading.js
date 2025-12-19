import { Skeleton } from "../../../components/ui/skeleton";

function loading() {
  return (
    <div className="w-[80%] mx-auto flex gap-60 items-center py-10">
      <Skeleton className="w-400 h-120" />
      <div className="w-400 h-150 flex flex-col gap-10 justify-center">
        <div className="flex flex-col gap-1">
          <Skeleton className="w-[70%] h-4" />
          <Skeleton className="w-[50%] h-4" />
          <Skeleton className="w-[40%] h-4" />
          <Skeleton className="w-[20%] h-4" />
          <Skeleton className="w-[10%] h-4" />
        </div>
        <div className="grid grid-cols-2 gap-2 items-center">
          <Skeleton className="w-50 h-10" />
          <Skeleton className="w-50 h-10" />
          <Skeleton className="w-50 h-10" />
          <Skeleton className="w-50 h-10" />
        </div>
        <Skeleton className="w-70 h-10 self-center" />
      </div>
    </div>
  );
}

export default loading;
