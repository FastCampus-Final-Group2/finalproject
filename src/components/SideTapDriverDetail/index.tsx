"use client";

import DriverDispatchDetailDashboard from "@/components/SideTapDriverDetail/DriverDispatchDetailDashboard";
import StopOverList from "@/components/SideTapDriverDetail/StopOverList";
import Icon from "@/components/core/Icon";
import { TEXT_650, BG_50 } from "@/styles/smColor";
import { useRecoilValue } from "recoil";
import { bgColorState } from "@/atoms/bgColorState";

export interface ListStopOverData {
  id: number;
  warningCheck: boolean;
  errorMessage: string;
  address: string;
  meter: number;
  kilogram: number;
}

interface SideTapDriverDetailProps {
  isSideTapExpanded: boolean;
  onClose: () => void;
  listStopOverData: ListStopOverData[];
  isExpanded: boolean;
  toggleExpand: () => void;
}

const SideTapDriverDetail = ({
  isSideTapExpanded,
  onClose,
  listStopOverData,
  isExpanded,
  toggleExpand,
}: SideTapDriverDetailProps) => {
  const bgColor = useRecoilValue(bgColorState);

  return (
    <div>
      {isSideTapExpanded && (
        <div className="relative h-[884px] w-[440px]">
          <DriverDispatchDetailDashboard
            drivingTime={16}
            mileage={23}
            totalOrder={81}
            availabilityOrder={80}
            bgColor={bgColor}
          />
          <StopOverList
            bgColor={bgColor}
            listStopOverData={listStopOverData}
            isExpanded={isExpanded}
            toggleExpand={toggleExpand}
          />
          <button
            className={`absolute bottom-[326px] right-[-16px] flex h-[128px] w-[48px] -translate-y-1/2 transform items-center justify-center rounded-full ${BG_50[bgColor]} z-10`}
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
