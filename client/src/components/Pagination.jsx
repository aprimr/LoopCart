import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Dot,
} from "lucide-react";

const Pagination = ({
  currentPage,
  totalPosts,
  postsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  if (totalPages <= 1) return null;

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const baseBtn = "px-3 py-1 rounded border-2 transition-colors duration-150";
  const activeBtn = "bg-gray-800 text-white dark:bg-gray-200 dark:text-black";
  const inactiveBtn =
    "bg-white text-black dark:bg-gray-950 dark:text-white dark:border-gray-600";
  const navBtn =
    "flex items-center gap-1 p-[6px] rounded border-2 transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600";

  return (
    <div className="flex items-center gap-2 text-sm font-poppins select-none">
      {/* Prev Button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${navBtn} disabled:opacity-50`}
      >
        <ChevronsLeft size={16} />
      </button>

      {/* First Page */}
      <button
        onClick={() => goToPage(1)}
        className={`${baseBtn} ${currentPage === 1 ? activeBtn : inactiveBtn}`}
      >
        1
      </button>

      {/* Dots before current */}
      {currentPage > 2 && (
        <span className="text-gray-500 dark:text-gray-400">
          <Dot size={16} />
        </span>
      )}

      {/* Current Page */}
      {currentPage > 1 && currentPage < totalPages && (
        <button disabled className={`${baseBtn} ${activeBtn}`}>
          {currentPage}
        </button>
      )}

      {/* Dots after current */}
      {currentPage < totalPages - 1 && (
        <span className="text-gray-500 dark:text-gray-400">
          <Dot size={16} />
        </span>
      )}

      {/* Last Page */}
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

      {/* Next Button */}
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
