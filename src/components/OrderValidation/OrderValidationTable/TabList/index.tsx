"use client";

import { ORDER_VALIDATION_TABLE_TABS } from "./index.constants";
import Item from "./Item";
import { Entries } from "@/types/util";
import Buttons from "./Buttons";
import { useRecoilValue } from "recoil";
import { excelDataTabNum } from "@/atoms/excelData";

const OrderValidationTabList = () => {
  const tabValue = useRecoilValue(excelDataTabNum);

  return (
    <div className="relative flex w-full gap-3 border-b border-gray-200">
      {(Object.entries(ORDER_VALIDATION_TABLE_TABS) as Entries<typeof ORDER_VALIDATION_TABLE_TABS>).map(
        ([key, tabName]) => {
          return <Item key={key} tabName={tabName} tabValue={tabValue[key]} />;
        },
      )}
      <div className="absolute right-0 top-0">
        <Buttons />
      </div>
    </div>
  );
};

export default OrderValidationTabList;
