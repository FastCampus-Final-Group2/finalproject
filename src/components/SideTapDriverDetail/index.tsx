"use client";

import DriverDispatchDetailDashboard from "@/components/SideTapDriverDetail/DriverDispatchDetailDashboard";
import StopOverList from "@/components/SideTapDriverDetail/StopOverList";
import Icon from "@/components/core/Icon";
import { TEXT_650, BG_50 } from "@/styles/smColor";
import { useRecoilState, useRecoilValue } from "recoil";
import { bgColorState } from "@/atoms/bgColorState";
import { dispatchDataState, selectedDriverState } from "@/atoms/dispatchData";
import { DispatchResponse, CourseDetailResponse } from "@/models/ApiTypes";

interface SideTapDriverDetailProps {
  listStopOverData: CourseDetailResponse[];
  isExpanded: boolean;
  toggleExpand: () => void;
}

const SideTapDriverDetail = ({ listStopOverData, isExpanded, toggleExpand }: SideTapDriverDetailProps) => {
  const bgColor = useRecoilValue(bgColorState);
  const [selectedDriver, setSelectedDriver] = useRecoilState(selectedDriverState);

  const [recoilDispatchData] = useRecoilState<DispatchResponse | null>(dispatchDataState);

  return (
    <div>
      {selectedDriver !== -1 && recoilDispatchData && (
        <div className="relative h-[884px] w-[440px]">
          {/* recoilDispatchData가 null이 아닌 경우에만 데이터를 접근 */}
          {recoilDispatchData.course && recoilDispatchData.course[selectedDriver] && (
            <DriverDispatchDetailDashboard
              drivingTime={recoilDispatchData.course[selectedDriver].totalTime}
              mileage={recoilDispatchData.course[selectedDriver].mileage}
              totalOrder={recoilDispatchData.course[selectedDriver].orderNum}
              availabilityOrder={80}
              floorAreaRatio={recoilDispatchData.course[selectedDriver].floorAreaRatio}
              driverName={recoilDispatchData.course[selectedDriver].smName}
              driverPhoneNumber={recoilDispatchData.course[selectedDriver].smPhoneNumber}
              vehicleType={recoilDispatchData.course[selectedDriver].vehicleType}
              vehicleTon={recoilDispatchData.course[selectedDriver].vehicleTon}
              bgColor={bgColor}
            />
          )}
          <StopOverList
            bgColor={bgColor}
            listStopOverData={listStopOverData}
            isExpanded={isExpanded}
            toggleExpand={toggleExpand}
          />
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
