import React from "react";

const PageSelector = ({
  currentPage,
  totalPages,
  onPageChange,
  showPrevNext = true,
  siblingCount = 1,
  boundaryCount = 2,
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];
    const startPages = [];
    const endPages = [];

    for (let i = 1; i <= Math.min(boundaryCount, totalPages); i++) {
      startPages.push(i);
    }

    for (
      let i = Math.max(totalPages - boundaryCount + 1, boundaryCount + 1);
      i <= totalPages;
      i++
    ) {
      endPages.push(i);
    }

    const siblingsStart = Math.max(
      currentPage - siblingCount,
      boundaryCount + 1,
    );
    const siblingsEnd = Math.min(
      currentPage + siblingCount,
      totalPages - boundaryCount,
    );

    pages.push(...startPages);

    if (siblingsStart > boundaryCount + 1) {
      pages.push("...");
    }

    for (let i = siblingsStart; i <= siblingsEnd; i++) {
      if (i > boundaryCount && i <= totalPages - boundaryCount) {
        pages.push(i);
      }
    }

    if (siblingsEnd < totalPages - boundaryCount) {
      pages.push("...");
    }

    const finalPages = [...pages, ...endPages];

    return finalPages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`flex items-center justify-center gap-2`}>
      {showPrevNext && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex h-8 w-8 items-center justify-center text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Previous page"
        >
          ‹
        </button>
      )}

      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <span className="px-2 text-gray-500">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page)}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border text-base font-medium transition-colors ${
                currentPage === page
                  ? "border-[#FF4000] bg-white text-[#FF4000]"
                  : "border-transparent bg-white text-gray-600 hover:border-gray-300"
              }`}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {showPrevNext && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex h-8 w-8 items-center justify-center text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Next page"
        >
          ›
        </button>
      )}
    </div>
  );
};

export default PageSelector;
