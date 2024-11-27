import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null; // Don't render pagination if there's only one page

  return (
    <div className="mt-8 flex justify-center">
      <nav className="inline-flex shadow-sm" aria-label="Pagination">
        {/* Previous Button */}
        <button className={`relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`} disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button key={page} className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === page ? "text-white bg-blue-600" : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"} border border-gray-300 dark:border-gray-600`} onClick={() => onPageChange(page)}>
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button className={`relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`} disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
