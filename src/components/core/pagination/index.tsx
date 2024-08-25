import { cn } from "@/utils/cn";
import paginationClass from "./index.variants";
import Icon from "@/components/core/Icon";

interface PaginationProps {
  page: number;
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
  currentPageGroup: number;
  setCurrentPageGroup: (pageGroup: number) => void;
}

const PaginationButtons = ({
  page,
  totalItems,
  perPage,
  onPageChange,
  currentPageGroup,
  setCurrentPageGroup,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / perPage);
  const pagesPerGroup = 5;

  const startPage = (currentPageGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const handleClick = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
      const newGroup = Math.ceil(newPage / pagesPerGroup);
      if (newGroup !== currentPageGroup) {
        setCurrentPageGroup(newGroup);
      }
    }
  };

  return (
    <div className={cn(paginationClass())}>
      {currentPageGroup > 1 && (
        <button onClick={() => handleClick(startPage - 1)}>
          <Icon id="arrowLargeDoubleLeft" size={14} />
        </button>
      )}
      <button onClick={() => handleClick(page - 1)} disabled={page === 1}>
        <Icon id="arrowLeft" />
      </button>
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handleClick(pageNumber)}
          className={cn(
            paginationClass({
              active: pageNumber === page ? "please" : "none",
              hover: "please",
            }),
            "h-[28px] w-[24px]",
          )}
        >
          {pageNumber}
          {pageNumber === page && <span className="absolute bottom-0 left-0 h-[3px] w-full bg-blue-500" />}
        </button>
      ))}
      <button onClick={() => handleClick(page + 1)} disabled={page === totalPages}>
        <Icon id="arrowRight" />
      </button>
      {currentPageGroup < Math.ceil(totalPages / pagesPerGroup) && (
        <button onClick={() => handleClick(endPage + 1)}>
          <Icon id="arrowLargeDoubleRight" size={14} />
        </button>
      )}
    </div>
  );
};

export default PaginationButtons;
