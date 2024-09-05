"use client";

import Pagination from "@/components/core/Pagination";
import OrderValidationHeader from "./OrderValidationHeader";
import OrderValidationTable from "./OrderValidationTable";
import { useRecoilState, useRecoilValue } from "recoil";
import { excelDataPageState, selectedExcelDataLengthState } from "@/atoms/excelData";

const OrderValidation = () => {
  const selectedExcelDataLength = useRecoilValue(selectedExcelDataLengthState);
  const [currentPage, setCurrentPage] = useRecoilState(excelDataPageState);

  return (
    <div className="flex flex-col items-center gap-14 px-12 py-[54px]">
      <OrderValidationHeader />
      <div className="mx-2.5 flex w-full flex-col gap-8">
        <OrderValidationTable />
        <div className="w-fit">
          <Pagination
            currentPage={currentPage}
            totalItems={selectedExcelDataLength}
            onPageChange={(newPage) => setCurrentPage(newPage)}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderValidation;
