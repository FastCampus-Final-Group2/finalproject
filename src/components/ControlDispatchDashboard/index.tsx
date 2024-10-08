"use client";

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { controlSideTabState } from "@/atoms/control";
import IssuesList from "./IssuesList";
import DeliveryTotalOrders from "./DeliveryTotalOrder";
import DispatchedDrivers from "./DispatchedDrivers";
import DeliveryProgressSideTab from "./DeliveryProgressSideTab";
import { DispatchListResponse } from "@/models/ApiTypes";

type ColorType = "lime" | "sky" | "violet" | "redwood" | "peanut" | "brown" | "forest" | "yale" | "olive";
type VehicleStatusType =
  | "DELIVERY_DELAY"
  | "WORK_COMPLETED"
  | "CANCELED"
  | "WORK_WAITING"
  | "WORK_START"
  | "MOVING"
  | "RESTING"
  | "RESTING_TIME"
  | "default";

const ControlDispatchDashboard = ({
  fetchedData,
  refreshDashboardData,
  refreshSideTabData,
  onDriverSelect,
}: {
  fetchedData: DispatchListResponse;
  refreshDashboardData: () => Promise<void>;
  refreshSideTabData: () => Promise<void>;
  onDriverSelect: (index: number | null) => void;
}) => {
  const smColors: ColorType[] = ["lime", "sky", "violet", "redwood", "peanut", "brown", "forest", "yale", "olive"];
  const [selectedColor, setSelectedColor] = useState(smColors[0]);
  const [selectedDispatchId, setSelectedDispatchId] = useState<number | null>(null);
  const [selectedDriverIndex, setSelectedDriverIndex] = useState<number | null>(null);
  const [selectedDestinationId, setSelectedDestinationId] = useState<number | null>(null);
  const [selectedDispatchDetailId, setSelectedDispatchDetailId] = useState<number | null>(null);

  const [sideTabState, setSideTabState] = useRecoilState(controlSideTabState);

  useEffect(() => {
    if (sideTabState.isExpanded && sideTabState.dispatchId !== null) {
      setSelectedColor(sideTabState.color as ColorType);
      setSelectedDispatchId(sideTabState.dispatchId);
    }
  }, [sideTabState]);

  const openSideTap = (color: ColorType, dispatchId: number, index: number, dispatchDetailId?: number) => {
    setSelectedColor(color);
    setSelectedDispatchId(dispatchId);
    setSelectedDriverIndex(index);
    setSelectedDestinationId(dispatchDetailId ?? null);
    setSelectedDispatchDetailId(dispatchDetailId ?? null);
    setSideTabState({ isExpanded: true, color, dispatchId });
    onDriverSelect(index);
  };

  const closeSideTap = () => {
    setSideTabState({ isExpanded: false, color: selectedColor, dispatchId: null });
    setSelectedDriverIndex(null);
    onDriverSelect(null);
  };

  const handleIssueSelect = (dispatchId: number) => {
    const driverIndex = fetchedData.dispatchList?.findIndex((driver) => driver.dispatchId === dispatchId) ?? -1;
    setSelectedDriverIndex(driverIndex);
    onDriverSelect(driverIndex);
  };

  return (
    <div className="flex">
      <div>
        <div className="h-[calc(100vh-196px)] overflow-y-auto bg-blue-30 scrollbar-hide">
          <div className="flex h-[156px] items-center justify-center">
            <DeliveryTotalOrders
              totalOrders={fetchedData.totalOrderNum ?? 0}
              completedOrder={fetchedData.totalCompletedOrderNum ?? 0}
              issueOrder={fetchedData.issueOrderNum ?? 0}
              deliveryProgress={fetchedData.totalProgressionRate ?? 0}
              refreshDashboardData={refreshDashboardData}
            />
          </div>
          <div className="flex h-[344px] w-[524px] justify-center">
            <DispatchedDrivers
              onClickToggle={(color, dispatchId, index) => openSideTap(color, dispatchId, index)}
              drivers={fetchedData.dispatchList ?? []}
              smColors={smColors}
              dispatchStatus={fetchedData.dispatchList?.map((item) => item.dispatchStatus as VehicleStatusType) ?? []}
            />
          </div>
          <div className="mt-[20px] flex max-h-[364px] min-h-[64px] w-[524px] justify-center">
            <IssuesList
              fetchedIssues={fetchedData.issueList ?? ([] as any)}
              onClickToggle={(color: ColorType, dispatchId: number, destinationId?: number) =>
                openSideTap(color, dispatchId, -1, destinationId)
              }
              onIssueSelect={handleIssueSelect} // 새로운 prop 전달
            />
          </div>
        </div>
      </div>
      <div>
        <DeliveryProgressSideTab
          isExpanded={sideTabState.isExpanded}
          onClose={closeSideTap}
          selectedColor={selectedColor}
          dispatchId={selectedDispatchId}
          refreshDashboardData={refreshDashboardData}
          refreshSideTabData={refreshSideTabData}
          selectedDestinationId={selectedDestinationId}
          selectedDispatchDetailId={selectedDispatchDetailId}
        />
      </div>
    </div>
  );
};

export default ControlDispatchDashboard;
