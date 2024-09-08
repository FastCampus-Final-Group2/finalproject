"use client";

import { useState } from "react";
import IssuesList from "./IssuesList";
import DeliveryTotalOrders from "./DeliveryTotalOrder";
import DispatchedDrivers from "./DispatchedDrivers";
import DeliveryProgressSideTab from "./DeliveryProgressSideTab";
import { DispatchListResponse } from "@/models/ApiTypes";

type ColorType = "lime" | "sky" | "violet" | "redwood" | "peanut" | "brown" | "forest" | "yale" | "olive";

// todo: api 연결된 다음에는 가림 처리한 부분 지우기
// const SmAndDeliveryRoutine: {
//   smNumber: number;
//   smName: string;
//   totalOrders: number;
//   completed: number;
//   deliveryProgress: number;
//   dispatchDetailStatus:
//     | "DELIVERY_DELAY"
//     | "WORK_COMPLETED"
//     | "CANCELED"
//     | "WORK_WAITING"
//     | "WORK_START"
//     | "MOVING"
//     | "RESTING"
//     | "RESTING_TIME"
//     | "default";
// }[] = [
//   {
//     smNumber: 1,
//     dispatchDetailStatus: "DELIVERY_DELAY",
//     smName: "김기사",
//     totalOrders: 20,
//     completed: 10,
//     deliveryProgress: 30,
//   },
//   {
//     smNumber: 2,
//     dispatchDetailStatus: "MOVING",
//     smName: "김기사",
//     totalOrders: 75,
//     completed: 25,
//     deliveryProgress: 10,
//   },
//   {
//     smNumber: 3,
//     dispatchDetailStatus: "WORK_WAITING",
//     smName: "김기사",
//     totalOrders: 75,
//     completed: 25,
//     deliveryProgress: 90,
//   },
//   {
//     smNumber: 4,
//     dispatchDetailStatus: "WORK_COMPLETED",
//     smName: "김기사",
//     totalOrders: 75,
//     completed: 25,
//     deliveryProgress: 45,
//   },
//   {
//     smNumber: 5,
//     dispatchDetailStatus: "RESTING",
//     smName: "김기사",
//     totalOrders: 75,
//     completed: 25,
//     deliveryProgress: 70,
//   },
//   {
//     smNumber: 6,
//     dispatchDetailStatus: "RESTING",
//     smName: "김기사",
//     totalOrders: 75,
//     completed: 25,
//     deliveryProgress: 99,
//   },
//   {
//     smNumber: 7,
//     dispatchDetailStatus: "DELIVERY_DELAY",
//     smName: "김기사",
//     totalOrders: 75,
//     completed: 25,
//     deliveryProgress: 50,
//   },
// ];

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
