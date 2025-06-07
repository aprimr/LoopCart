import React from "react";
import { ChevronsLeft, ChevronsRight, Dot } from "lucide-react";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const baseBtn =
    "px-3 py-1.5 rounded-md border text-sm font-medium transition-colors";
  const activeBtn =
    "bg-gray-900 text-white dark:bg-white dark:text-black border-gray-900 dark:border-white";
  const inactiveBtn =
    "bg-white text-black dark:bg-gray-950 dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800";
  const navBtn =
    "p-1.5 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition";

  return (
    <div className="flex items-center gap-2 text-sm font-medium select-none mt-4">
      {/* Prev */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${navBtn} disabled:opacity-50`}
      >
        <ChevronsLeft size={16} />
      </button>

      {/* First */}
      <button
        onClick={() => goToPage(1)}
        className={`${baseBtn} ${currentPage === 1 ? activeBtn : inactiveBtn}`}
      >
        1
      </button>

      {/* Dots before */}
      {currentPage > 2 && (
        <span className="text-gray-400 dark:text-gray-500">
          <Dot size={16} />
        </span>
      )}

      {/* Current */}
      {currentPage > 1 && currentPage < totalPages && (
        <button disabled className={`${baseBtn} ${activeBtn}`}>
          {currentPage}
        </button>
      )}

      {/* Dots after */}
      {currentPage < totalPages - 1 && (
        <span className="text-gray-400 dark:text-gray-500">
          <Dot size={16} />
        </span>
      )}

      {/* Last */}
      {totalPages !== 1 && (
        <button
          onClick={() => goToPage(totalPages)}
          className={`${baseBtn} ${
            currentPage === totalPages ? activeBtn : inactiveBtn
          }`}
        >
          {totalPages}
        </button>
      )}

      {/* Next */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${navBtn} disabled:opacity-50`}
      >
        <ChevronsRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
