"use client";

import { useState } from "react";
import DeliveryProgressInfo from "@/components/DeliveryProgressInfo";
import DeliveryRoutine from "@/components/DeliveryRoutine";
import DriverList from "@/components/OrderDashBoard/DriverList";
import IssuesList from "./IssuesList";
import DeliveryTotalOrders from "./DeliveryTotalOrder";

const ControlDispatchDashboard = () => {
  const [isSideTapExpanded, setSideTapExpanded] = useState(false);

  const openSideTap = () => setSideTapExpanded(true);
  const closeSideTap = () => setSideTapExpanded(false);
  return (
    <div className="flex">
      <div>
        <div className="h-[884px] w-[524px] bg-blue-30">
          <div className="flex h-[156px] w-[524px] items-center justify-center">
            <DeliveryTotalOrders totalOrders={76} issueOrder={8} deliveryProgress={57} completedOrder={26} />
          </div>
          <div className="flex h-[344px] w-[524px] justify-center">
            <DriverList onClickToggle={openSideTap} />
          </div>
          <div className="mt-[20px] flex max-h-[364px] min-h-[64px] w-[524px] justify-center">
            <IssuesList />
          </div>
        </div>
      </div>
      <div className="flex h-[884px] w-fit flex-col gap-[24px] bg-purple-50 px-[32px] pb-[15px] pt-[20px]">
        <div className="flex w-fit flex-col gap-[4px] rounded-[8px] bg-white p-[20px]">
          <DeliveryProgressInfo />
        </div>
        <div className="flex h-[556px] w-fit flex-col gap-[4px] rounded-[8px] bg-white pl-[12px] pr-[16px] pt-[20px]">
          <DeliveryRoutine />
        </div>
      </div>
    </div>
  );
};

export default ControlDispatchDashboard;
