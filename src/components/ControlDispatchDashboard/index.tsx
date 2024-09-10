"use client";

import { useState } from "react";
import IssuesList from "./IssuesList";
import DeliveryTotalOrders from "./DeliveryTotalOrder";
import DispatchedDrivers from "./DispatchedDrivers";
import DeliveryProgressSideTab from "./DeliveryProgressSideTab";
import { DispatchListResponse } from "@/models/ApiTypes";

type ColorType = "lime" | "sky" | "violet" | "redwood" | "peanut" | "brown" | "forest" | "yale" | "olive";

const ControlDispatchDashboard = ({ fetchedData }: { fetchedData: DispatchListResponse }) => {
  const smColors: ColorType[] = ["lime", "sky", "violet", "redwood", "peanut", "brown", "forest", "yale", "olive"];
  const [selectedColor, setSelectedColor] = useState(smColors[0]);
  const [selectedDispatchId, setSelectedDispatchId] = useState<number | null>(null);

  const [isSideTapExpanded, setSideTapExpanded] = useState(false);

  const openSideTap = (color: ColorType, dispatchId: number) => {
    setSelectedColor(color);
    setSelectedDispatchId(dispatchId);
    setSideTapExpanded(true);
    console.log(dispatchId);
  };
  const closeSideTap = () => setSideTapExpanded(false);

  return (
    <div className="flex">
      <div>
        <div className="h-[884px] w-[524px] bg-blue-30">
          <div className="flex h-[156px] w-[524px] items-center justify-center">
            <DeliveryTotalOrders
              totalOrders={fetchedData.totalOrderNum ?? 0}
              completedOrder={fetchedData.totalCompletedOrderNum ?? 0}
              issueOrder={fetchedData.issueOrderNum ?? 0}
              deliveryProgress={fetchedData.totalProgressionRate ?? 0}
            />
          </div>
          <div className="flex h-[344px] w-[524px] justify-center">
            {/* todo: onClickToggle={openSideTap} 타입 정리할 것. 일단 동작은 함. */}
            <DispatchedDrivers
              onClickToggle={openSideTap}
              drivers={fetchedData.dispatchList ?? []}
              smColors={smColors}
              dispatchStatus={fetchedData.dispatchList?.[0]?.dispatchStatus ?? []}
            />
          </div>
          <div className="mt-[20px] flex max-h-[364px] min-h-[64px] w-[524px] justify-center">
            <IssuesList fetchedIssues={fetchedData.issueList ?? []} />
          </div>
        </div>
      </div>
      <div>
        <DeliveryProgressSideTab
          isExpanded={isSideTapExpanded}
          onClose={closeSideTap}
          selectedColor={selectedColor}
          dispatchId={selectedDispatchId}
        />
      </div>
    </div>
  );
};

export default ControlDispatchDashboard;
