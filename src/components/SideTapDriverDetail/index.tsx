"use client";

import DriverDispatchDetailDashboard from "@/components/SideTapDriverDetail/DriverDispatchDetailDashboard";
import StopOverList from "@/components/SideTapDriverDetail/StopOverList";
import Icon from "@/components/core/Icon";

interface SideTapDriverDetailProps {
  isExpanded: boolean;
  onClose: () => void;
}

const SideTapDriverDetail = ({ isExpanded, onClose }: SideTapDriverDetailProps) => {
  return (
    <div>
      {isExpanded && (
        <div className="relative h-[884px] w-[440px]">
          <DriverDispatchDetailDashboard />
          <StopOverList />
          <button
            className="absolute bottom-[378px] right-[-16px] flex h-[64px] w-[32px] -translate-y-1/2 transform items-center justify-center rounded-full bg-lime-50"
            onClick={onClose}
          >
            <Icon id="arrowLargeDoubleLeft" size={24} className="text-lime-650" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SideTapDriverDetail;
