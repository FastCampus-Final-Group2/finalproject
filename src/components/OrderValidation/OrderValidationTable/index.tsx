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
      <ul className="flex w-full flex-col overflow-x-scroll scrollbar-hide">
        <OrderValidationTableHeader />
        {selectedRowIds.map((rowId, index) => {
          return <OrderValidationTableRow key={rowId} rowId={rowId} isOdd={index % 2 === 0} />;
        })}
        {selectedRowIds.length < ORDER_VALIDATION_PER_PAGE &&
          Array.from({ length: ORDER_VALIDATION_PER_PAGE - selectedRowIds.length }).map((_, index) => {
            return <EmptyRow key={`Emtpy Row ${index}`} isOdd={index % 2 === 0} />;
          })}
      </ul>
    </div>
  );
};

export default OrderValidationTable;
