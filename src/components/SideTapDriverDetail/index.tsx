"use client";

import DriverDispatchDetailDashboard from "@/components/SideTapDriverDetail/DriverDispatchDetailDashboard";
import StopOverList from "@/components/SideTapDriverDetail/StopOverList";
import Icon from "@/components/core/Icon";
import { TEXT_650, BG_50 } from "@/styles/smColor";
import { useRecoilState, useRecoilValue } from "recoil";
import { bgColorState } from "@/atoms/bgColorState";
import { dispatchDataState, selectedDriverState } from "@/atoms/dispatchData";

interface SideTapDriverDetailProps {
  isExpanded: boolean;
  toggleExpand: () => void;
}

const SideTapDriverDetail = ({ isExpanded, toggleExpand }: SideTapDriverDetailProps) => {
  const bgColor = useRecoilValue(bgColorState);
  const [selectedDriver, setSelectedDriver] = useRecoilState(selectedDriverState);

  const [dispatchData] = useRecoilState(dispatchDataState);

  return (
    <div>
      {selectedDriver !== -1 && dispatchData && (
        <div className="relative h-[884px] w-[440px]">
          {/* recoilDispatchData가 null이 아닌 경우에만 데이터를 접근 */}
          {dispatchData.course && dispatchData.course[selectedDriver] && (
            <DriverDispatchDetailDashboard
              drivingTime={dispatchData.course[selectedDriver].totalTime}
              mileage={dispatchData.course[selectedDriver].mileage}
              totalOrder={dispatchData.course[selectedDriver].orderNum}
              availabilityOrder={dispatchData.course[selectedDriver].availableNum}
              floorAreaRatio={dispatchData.course[selectedDriver].floorAreaRatio}
              driverName={dispatchData.course[selectedDriver].smName}
              driverPhoneNumber={dispatchData.course[selectedDriver].smPhoneNumber}
              vehicleType={dispatchData.course[selectedDriver].vehicleType}
              vehicleTon={dispatchData.course[selectedDriver].vehicleTon}
              bgColor={bgColor}
            />
          )}
          <StopOverList bgColor={bgColor} isExpanded={isExpanded} toggleExpand={toggleExpand} />
          <button
            className={`absolute bottom-[326px] right-[-16px] flex h-[128px] w-[48px] -translate-y-1/2 transform items-center justify-center rounded-full ${BG_50[bgColor]} z-10`}
            onClick={() => setSelectedDriver(-1)}
          >
            <Icon id="arrowLargeDoubleLeft" size={24} className={TEXT_650[bgColor]} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SideTapDriverDetail;
