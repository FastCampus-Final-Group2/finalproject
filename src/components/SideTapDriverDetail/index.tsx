"use client";

import DriverDispatchDetailDashboard from "@/components/SideTapDriverDetail/DriverDispatchDetailDashboard";
import StopOverList from "@/components/SideTapDriverDetail/StopOverList";
import Icon from "@/components/core/Icon";
import { TEXT_650, BG_50 } from "@/styles/smColor";

interface SideTapDriverDetailProps {
  isExpanded: boolean;
  onClose: () => void;
}

const SideTapDriverDetail = ({ isExpanded, onClose }: SideTapDriverDetailProps) => {
  const bgColor = "violet";
  return (
    <div>
      {isExpanded && (
        <div className="relative h-[884px] w-[440px]">
          <DriverDispatchDetailDashboard
            drivingTime={16}
            mileage={23}
            totalOrder={20}
            availabilityOrder={80}
            bgColor={bgColor}
          />
          <StopOverList bgColor={bgColor} />
          <button
            className={`absolute bottom-[326px] right-[-16px] flex h-[128px] w-[48px] -translate-y-1/2 transform items-center justify-center rounded-full ${BG_50[bgColor]}`}
            onClick={onClose}
          >
            <Icon id="arrowLargeDoubleLeft" size={24} className={TEXT_650[bgColor]} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SideTapDriverDetail;
