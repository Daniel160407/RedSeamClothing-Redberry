import React from "react";

const PageSelector = ({ page, setPage, totalPages, maxVisiblePages = 5 }) => {
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    setPage(newPage);
  };

  const generatePageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    pages.push(1);

    let startPage = Math.max(2, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (page <= 4) {
      endPage = 5;
    }

    if (page >= totalPages - 3) {
      startPage = totalPages - 4;
    }

    if (startPage > 2) {
      pages.push("ellipsis-start");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push("ellipsis-end");
    }

    pages.push(totalPages);

    return pages;
  };

  const renderPageItem = (pageNumber) => {
    if (pageNumber === "ellipsis-start" || pageNumber === "ellipsis-end") {
      return (
        <span
          key={pageNumber}
          className="px-3 py-2 font-medium text-gray-500 select-none"
        >
          ...
        </span>
      );
    }

    const isActive = page === pageNumber;

    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        disabled={isActive}
        className={`h-10 w-10 rounded-lg border font-medium transition-all duration-200 ${
          isActive
            ? "cursor-default border-2 border-[#FF4000] text-[#FF4000]"
            : "cursor-pointer border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-100"
        } focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50`}
      >
        {pageNumber}
      </button>
    );
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 p-4">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-100 focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
      >
        ←
      </button>

      {generatePageNumbers().map(renderPageItem)}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-100 focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
      >
        →
      </button>
    </div>
  );
};

export default PageSelector;
