"use client";

import { useState } from "react";
import Icon from "@/components/core/Icon";
import { cn } from "@/utils/cn";
import paginationClass from "./index.varients";

const Pagination = ({
  totalPages = 5,
  currentPage = 1,
  onPageChange,
}: {
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}) => {
  const [activePage, setActivePage] = useState(currentPage);

  const handlePageClick = (page: number) => {
    setActivePage(page);
    if (onPageChange) onPageChange(page);
  };

  const handlePrevClick = () => {
    if (activePage > 1) {
      handlePageClick(activePage - 1);
    }
  };

  const handleNextClick = () => {
    if (activePage < totalPages) {
      handlePageClick(activePage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={cn("pagination-button", activePage === i && "active")}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>,
      );
    }
    return pages;
  };

  return (
    <div className={cn(paginationClass())}>
      <button onClick={handlePrevClick} disabled={activePage === 1}>
        <Icon id="arrowLeft" size={16} />
      </button>
      <button>{renderPageNumbers()}</button>
      <button onClick={handleNextClick} disabled={activePage === totalPages}>
        <Icon id="arrowRight" size={16} />
      </button>
    </div>
  );
};

export default Pagination;
