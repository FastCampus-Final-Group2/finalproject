"use client";

import PaginationButtons from "@/components/core/Pagination";
import OrderValidationHeader from "./OrderValidationHeader";
import OrderValidationTable from "./OrderValidationTable";
import { useState } from "react";

const OrderValidation = () => {
  const [page, setPage] = useState(1);
  const [currentPageGroup, setCurrentPageGroup] = useState(1);

  return (
    <div className="flex flex-col items-center gap-14 px-12 py-[54px]">
      <OrderValidationHeader />
      <div className="mx-2.5 flex w-full flex-col gap-8">
        <OrderValidationTable />
        <div className="w-fit">
          <PaginationButtons
            page={page}
            totalItems={100}
            perPage={10}
            onPageChange={setPage}
            currentPageGroup={currentPageGroup}
            setCurrentPageGroup={setCurrentPageGroup}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderValidation;
