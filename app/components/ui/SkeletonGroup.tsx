import { Skeleton } from "./skeleton";

const SkeletonGroup = () => {
  return (
    <div className="flex flex-col gap-4 h-[19rem]">
      <Skeleton className="bg-[#232323] w-full h-full rounded-sm" />
      <Skeleton className="bg-[#232323] w-full h-full rounded-sm" />
      <Skeleton className="bg-[#232323] w-full h-full rounded-sm" />
    </div>
  );
};

export default SkeletonGroup;
