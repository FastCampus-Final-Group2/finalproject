"use client";

import { useState } from "react";
import TotalOrder from "@/components/OrderDashBoard/TotalOrder";
import DriverList from "@/components/OrderDashBoard/DriverList";
import PendingOrderList from "@/components/OrderDashBoard/PendingOrderList";
import SideTapDriverDetail from "@/components/SideTapDriverDetail";

const OrderDashBoard = () => {
  const [isSideTapExpanded, setSideTapExpanded] = useState(false);

  const openSideTap = () => setSideTapExpanded(true);
  const closeSideTap = () => setSideTapExpanded(false);

  return (
    <div className="flex">
      <div className="h-[884px] w-[524px] bg-blue-30">
        <div className="flex h-[156px] w-[524px] items-center justify-center">
          <TotalOrder totalOrders={76} errorOrders={8} estimatedTime={16} capacityRate={90} />
        </div>
        <div className="flex h-[344px] w-[524px] justify-center">
          <DriverList onClickToggle={openSideTap} />
        </div>
        <div className="mt-[20px] flex max-h-[364px] min-h-[64px] w-[524px] justify-center">
          <PendingOrderList />
        </div>
      </div>
      <div>
        <SideTapDriverDetail isExpanded={isSideTapExpanded} onClose={closeSideTap} />
      </div>
    </div>
  );
};

export default OrderDashBoard;
