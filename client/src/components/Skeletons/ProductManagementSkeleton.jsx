function ProductManagementSkeleton() {
  return (
    <div className="grid  gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-pulse">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div className="p-3 sm:p-4 md:p-6 space-y-4">
      <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg"></div>

      <div className="space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>

        <div className="flex gap-2 flex-wrap">
          <div className="h-5 w-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="h-5 w-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>

        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-6 w-28 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductManagementSkeleton;
