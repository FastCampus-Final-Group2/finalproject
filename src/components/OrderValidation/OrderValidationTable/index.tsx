"use client";

import OrderValidationTableRow from "./Row";
import OrderValidationTabList from "./TabList";
import OrderValidationTableHeader from "./Header";
import { ORDER_VALIDATION_PER_PAGE } from "./index.constants";
import EmptyRow from "./EmptyRow";
import { useRecoilValue } from "recoil";
import { selectedExcelDataRowIdsSelector } from "@/atoms/excelData";

const OrderValidationTable = () => {
  const selectedRowIds = useRecoilValue(selectedExcelDataRowIdsSelector);

  return (
    <div className="flex flex-col gap-12">
      <OrderValidationTabList />
      <div className="flex w-full flex-col overflow-x-scroll [&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-thumb]:rounded-4 [&::-webkit-scrollbar-thumb]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-4 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar]:h-2">
        <OrderValidationTableHeader />
        {selectedRowIds.map((rowId, index) => {
          return <OrderValidationTableRow key={rowId} rowId={rowId} isOdd={index % 2 === 0} />;
        })}
        {selectedRowIds.length < ORDER_VALIDATION_PER_PAGE &&
          Array.from({ length: ORDER_VALIDATION_PER_PAGE - selectedRowIds.length }).map((_, index) => {
            return <EmptyRow key={`Emtpy Row ${index}`} isOdd={index % 2 === 0} />;
          })}
      </div>
    </div>
  );
};

export default OrderValidationTable;
