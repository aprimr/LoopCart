import React from "react";

function UsersSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {[...Array(8)].map((_, i) => (
                  <th key={i} className="px-4 py-3.5 text-left">
                    <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 sm:w-20 animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 sm:w-24 animate-pulse"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 sm:w-32 animate-pulse"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-12 sm:w-16 animate-pulse"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16 sm:w-20 animate-pulse"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-12 sm:w-16 animate-pulse"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 sm:w-20 animate-pulse"></div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <div className="h-7 w-7 sm:h-8 sm:w-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                      <div className="h-7 w-7 sm:h-8 sm:w-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile skeleton */}
      <div className="md:hidden space-y-3 w-full">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="p-3 sm:p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm w-full"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 sm:w-24 mb-2 animate-pulse"></div>
                <div className="h-2 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 sm:w-32 animate-pulse"></div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
              <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-12 sm:w-16 animate-pulse"></div>
              <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16 sm:w-20 animate-pulse"></div>
              <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-12 sm:w-16 animate-pulse"></div>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 sm:w-20 animate-pulse"></div>
              <div className="flex gap-2">
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersSkeleton;
