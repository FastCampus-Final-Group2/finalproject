"use client";

import OrderValidationTableRow from "./Row";
import OrderValidationTabList from "./TabList";
import OrderValidationTableHeader from "./Header";
import { ORDER_VALIDATION_PER_PAGE } from "./index.constants";
import EmptyRow from "./EmptyRow";
import { useRecoilValue } from "recoil";
import { endRowSelector, startRowSelector } from "@/atoms/excelData";

const OrderValidationTable = () => {
  const startRow = useRecoilValue(startRowSelector);
  const endRow = useRecoilValue(endRowSelector);

  return (
    <div className="flex flex-col gap-12">
      <OrderValidationTabList />
      <ul className="flex w-full flex-col overflow-x-scroll scrollbar-hide">
        <OrderValidationTableHeader />
        {Array.from({ length: endRow - startRow + 1 }).map((_, index) => {
          return <OrderValidationTableRow key={index} rowIndex={startRow + index} isOdd={index % 2 === 0} />;
        })}
        {endRow - startRow + 1 < ORDER_VALIDATION_PER_PAGE &&
          Array.from({ length: ORDER_VALIDATION_PER_PAGE - (endRow - startRow + 1) }).map((_, index) => {
            return <EmptyRow key={`Emtpy Row ${index}`} isOdd={index % 2 === 0} />;
          })}
      </ul>
    </div>
  );
};

export default OrderValidationTable;
