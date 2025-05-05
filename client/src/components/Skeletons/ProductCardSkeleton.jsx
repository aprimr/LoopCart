import React from "react";

const ProductCardSkeleton = ({ className }) => {
  return (
    <div
      className={`bg-white dark:bg-black transition duration-300 rounded-md w-full max-w-xs p-3 flex-col animate-pulse ${className}`}
    >
      {/* Image Placeholder */}
      <div className="relative w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl mb-4 overflow-hidden">
        <div className="absolute top-2 right-2 w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full" />
        <div className="absolute bottom-2 left-2 flex space-x-2">
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded-sm" />
          <div className="h-4 w-10 bg-gray-300 dark:bg-gray-600 rounded-sm" />
        </div>
      </div>

      {/* Text Lines */}
      <div className="space-y-2 px-1">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full" />
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />

        <div className="w-full flex justify-between space-x-2">
          <div className="h-3 w-12 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-3 w-10 bg-gray-300 dark:bg-gray-600 rounded" />
        </div>

        <div className="w-full flex space-x-6">
          <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-600 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
