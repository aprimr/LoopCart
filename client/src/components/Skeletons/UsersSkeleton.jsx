import React from "react";

function UsersSkeleton() {
  return (
    <div className="w-full min-h-[100svh] bg-white dark:bg-black px-4 py-6 space-y-4">
      {/* Mobile Skeleton */}
      <div className="block md:hidden space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-4xl font-roboto  font-bold text-gray-800 dark:text-white">
            Users Management
          </h1>
          <div className="h-8 w-full bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
        </div>

        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="p-4 bg-gray-200 dark:bg-gray-800 rounded-xl space-y-3 animate-pulse"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 w-2/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-3 w-4/5 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-2">
              <div className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-3 w-14 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-3 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="h-3 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-3 w-14 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Skeleton */}
      <div className="hidden md:block space-y-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-4xl font-roboto  font-bold text-gray-800 dark:text-white">
            Users Management
          </h1>
          <div className="h-10 w-72 bg-gray-300 dark:bg-gray-800 rounded-full animate-pulse"></div>
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-7 items-center gap-4 px-3 py-5 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse">
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>

        <div className="space-y-2">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-7 items-center gap-4 p-3 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-3 w-full bg-gray-300 dark:bg-gray-600 rounded"
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UsersSkeleton;
