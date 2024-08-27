"use client";

import { useState } from "react";
import { ORDER_VALIDATION_TABLE_TABS } from "./index.constants";
import Item from "./Item";
import { Entries, ObjectValues } from "@/types/util";

interface OrderValidationTabListProps {
  tabValue: {
    total: number;
    complete: number;
    error: number;
  };
}

const OrderValidationTabList = ({ tabValue }: OrderValidationTabListProps) => {
  const [activeTab, setActiveTab] = useState<ObjectValues<typeof ORDER_VALIDATION_TABLE_TABS>>("전체");

  return (
    <div className="flex w-full gap-3 border-b border-gray-200">
      {(Object.entries(ORDER_VALIDATION_TABLE_TABS) as Entries<typeof ORDER_VALIDATION_TABLE_TABS>).map(
        ([key, tabName]) => {
          return (
            <Item
              key={key}
              tabName={tabName}
              tabValue={tabValue[key]}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          );
        },
      )}
    </div>
  );
};

export default OrderValidationTabList;
