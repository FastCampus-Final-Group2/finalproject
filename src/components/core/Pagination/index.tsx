"use client";

import { cn } from "@/utils/cn";
import paginationClass from "./index.variants";
import Icon from "@/components/core/Icon";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  perPage?: number;
  pagesPerGroup?: number;
  onPageChange: (page: number) => void;
}

const DEFAULT_PER_PAGE = 10;
const DEFAULT_PAGES_PER_GROUP = 5;

const Pagination = ({
  currentPage,
  totalItems,
  perPage = DEFAULT_PER_PAGE,
  onPageChange,
  pagesPerGroup = DEFAULT_PAGES_PER_GROUP,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / perPage);
  const currentPageGroup = Math.ceil(currentPage / pagesPerGroup);

  const startPageInGroup = (currentPageGroup - 1) * pagesPerGroup + 1;
  const endPageInGroup = Math.min(startPageInGroup + pagesPerGroup - 1, totalPages);

  const handleClick = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className={cn(paginationClass())}>
      {currentPageGroup > 1 && (
        <button type="button" onClick={() => handleClick(startPageInGroup - 1)}>
          <Icon id="arrowLargeDoubleLeft" size={14} />
        </button>
      )}
      <button type="button" onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
        <Icon id="arrowLeft" />
      </button>
      {Array.from({ length: endPageInGroup - startPageInGroup + 1 }, (_, index) => startPageInGroup + index).map(
        (page) => (
          <button
            type="button"
            key={page}
            onClick={() => handleClick(page)}
            className={cn(
              paginationClass({
                active: page === currentPage ? "please" : "none",
                hover: "please",
              }),
              "h-[28px] w-[24px]",
            )}
          >
            {page}
            {page === currentPage && <span className="absolute bottom-0 left-0 h-[3px] w-full bg-blue-500" />}
          </button>
        ),
      )}
      <button type="button" onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
        <Icon id="arrowRight" />
      </button>
      {currentPageGroup < Math.ceil(totalPages / pagesPerGroup) && (
        <button type="button" onClick={() => handleClick(endPageInGroup + 1)}>
          <Icon id="arrowLargeDoubleRight" size={14} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
