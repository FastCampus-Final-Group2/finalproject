"use client";

import { useState } from "react";
import IssuesList from "./IssuesList";
import DeliveryTotalOrders from "./DeliveryTotalOrder";
import DispatchedDrivers from "./DispatchedDrivers";
import DeliveryProgressSideTab from "./DeliveryProgressSideTab";

type ColorType = "lime" | "sky" | "violet" | "redwood" | "peanut" | "brown" | "forest" | "yale" | "olive";

const SmAndDeliveryRoutine = [
  { statusText: "배송지연", smName: "김기사", totalOrders: 20, completed: 10, deliveryProgress: 30 },
  { statusText: "이동 중", smName: "김기사", totalOrders: 75, completed: 25, deliveryProgress: 10 },
  { statusText: "작업대기", smName: "김기사", totalOrders: 75, completed: 25, deliveryProgress: 90 },
  { statusText: "작업완료", smName: "김기사", totalOrders: 75, completed: 25, deliveryProgress: 45 },
  { statusText: "작업시작", smName: "김기사", totalOrders: 75, completed: 25, deliveryProgress: 70 },
  { statusText: "휴게 중", smName: "김기사", totalOrders: 75, completed: 25, deliveryProgress: 99 },
  { statusText: "배송지연", smName: "김기사", totalOrders: 75, completed: 25, deliveryProgress: 55 },
  { statusText: "작업시작", smName: "김기사", totalOrders: 75, completed: 25, deliveryProgress: 12 },
  { statusText: "작업대기", smName: "김기사", totalOrders: 75, completed: 25, deliveryProgress: 48 },
  { statusText: "작업완료", smName: "김기사", totalOrders: 75, completed: 25, deliveryProgress: 50 },
  { statusText: "이동 중", smName: "김기사", totalOrders: 75, completed: 25, deliveryProgress: 33 },
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
