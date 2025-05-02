const SkeletonNotification = () => {
  return (
    <>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </>
  );
};

function Skeleton() {
  return (
    <div className="flex items-center flex-row gap-2 animate-pulse">
      {/* Circle icon skeleton */}
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 relative">
        {/* Placeholder for dot */}
        <div className="absolute top-0 right-1 h-3 w-3 bg-gray-400 dark:bg-gray-600 rounded-full border-2 border-white dark:border-black" />
      </div>

      {/* Text skeleton */}
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex items-center justify-between">
          <div className="w-2/3 h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="w-1/6 h-2.5 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="w-full h-2.5 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}

export default SkeletonNotification;
