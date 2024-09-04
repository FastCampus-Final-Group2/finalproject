"use client";

import { useState } from "react";
import IssuesList from "./IssuesList";
import DeliveryTotalOrders from "./DeliveryTotalOrder";
import DispatchedDrivers from "./DispatchedDrivers";
import DeliveryProgressSideTab from "./DeliveryProgressSideTab";

type ColorType = "lime" | "sky" | "violet" | "redwood" | "peanut" | "brown" | "forest" | "yale" | "olive";

const SmAndDeliveryRoutine: {
  smNumber: number;
  smName: string;
  totalOrders: number;
  completed: number;
  deliveryProgress: number;
  dispatchDetailStatus:
    | "DELIVERY_DELAY"
    | "WORK_COMPLETED"
    | "CANCELED"
    | "WORK_WAITING"
    | "WORK_START"
    | "MOVING"
    | "RESTING"
    | "RESTING_TIME"
    | "default";
}[] = [
  {
    smNumber: 1,
    dispatchDetailStatus: "DELIVERY_DELAY",
    smName: "김기사",
    totalOrders: 20,
    completed: 10,
    deliveryProgress: 30,
  },
  {
    smNumber: 2,
    dispatchDetailStatus: "MOVING",
    smName: "김기사",
    totalOrders: 75,
    completed: 25,
    deliveryProgress: 10,
  },
  {
    smNumber: 3,
    dispatchDetailStatus: "WORK_WAITING",
    smName: "김기사",
    totalOrders: 75,
    completed: 25,
    deliveryProgress: 90,
  },
  {
    smNumber: 4,
    dispatchDetailStatus: "WORK_COMPLETED",
    smName: "김기사",
    totalOrders: 75,
    completed: 25,
    deliveryProgress: 45,
  },
  {
    smNumber: 5,
    dispatchDetailStatus: "RESTING",
    smName: "김기사",
    totalOrders: 75,
    completed: 25,
    deliveryProgress: 70,
  },
  {
    smNumber: 6,
    dispatchDetailStatus: "RESTING",
    smName: "김기사",
    totalOrders: 75,
    completed: 25,
    deliveryProgress: 99,
  },
  {
    smNumber: 7,
    dispatchDetailStatus: "DELIVERY_DELAY",
    smName: "김기사",
    totalOrders: 75,
    completed: 25,
    deliveryProgress: 50,
  },
];

const ControlDispatchDashboard = () => {
  const smColors: ColorType[] = ["lime", "sky", "violet", "redwood", "peanut", "brown", "forest", "yale", "olive"];
  const [selectedColor, setSelectedColor] = useState(smColors[0]);

  const [isSideTapExpanded, setSideTapExpanded] = useState(false);

  const openSideTap = (color: ColorType) => {
    setSelectedColor(color);
    setSideTapExpanded(true);
  };
  const closeSideTap = () => setSideTapExpanded(false);

  return (
    <div className="flex">
      <div>
        <div className="h-[884px] w-[524px] bg-blue-30">
          <div className="flex h-[156px] w-[524px] items-center justify-center">
            <DeliveryTotalOrders totalOrders={76} issueOrder={8} deliveryProgress={57} completedOrder={26} />
          </div>
          <div className="flex h-[344px] w-[524px] justify-center">
            {/* todo: onClickToggle={openSideTap} 타입 정리할 것. 일단 동작은 함. */}
            <DispatchedDrivers onClickToggle={openSideTap} drivers={SmAndDeliveryRoutine} smColors={smColors} />
          </div>
          <div className="mt-[20px] flex max-h-[364px] min-h-[64px] w-[524px] justify-center">
            <IssuesList />
          </div>
        </div>
      </div>
      <div>
        <DeliveryProgressSideTab isExpanded={isSideTapExpanded} onClose={closeSideTap} selectedColor={selectedColor} />
      </div>
    </div>
  );
};

export default ControlDispatchDashboard;
