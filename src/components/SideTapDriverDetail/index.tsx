"use client";

import DriverDispatchDetailDashboard from "@/components/SideTapDriverDetail/DriverDispatchDetailDashboard";
import StopOverList from "@/components/SideTapDriverDetail/StopOverList";
import Icon from "@/components/core/Icon";
import { TEXT_650, BG_50 } from "@/styles/smColor";
import { useRecoilValue } from "recoil";
import { bgColorState } from "@/atoms/bgColorState";
import { transportOrderState } from "@/atoms/transportOrder";
import { driverIndex } from "@/atoms/driverIndex";

export interface ListStopOverData {
  restrictedTonCode: boolean;
  delayRequestTime: boolean;
  overContractNum: boolean;
  ett: number;
  expectationOperationStartTime: string;
  expectationOperationEndTime: string;
  deliveryDestinationId: number;
  managerName: string | null;
  phoneNumber: string | null;
  lat: number;
  lon: number;
  distance: number;
  deliveryType: string;
  smId: number;
  smName: string;
  shipmentNumber: string;
  clientOrderKey: string;
  orderType: string;
  receivedDate: string;
  serviceRequestDate: string;
  serviceRequestTime: string;
  clientName: string;
  contact: string;
  roadAddress: string;
  lotNumberAddress: string;
  detailAddress: string;
  zipcode: string;
  volume: number;
  weight: number;
  note: string;
  expectedServiceDuration: number;
  productName: string;
  productCode: string;
  productQuantity: number;
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
  const driverIndexState = useRecoilValue(driverIndex);
  const dispatchData = useRecoilValue(transportOrderState);

  return (
    <div>
      {isSideTapExpanded && (
        <div className="relative h-[884px] w-[440px]">
          <DriverDispatchDetailDashboard
            drivingTime={dispatchData.course[driverIndexState].totalTime}
            mileage={dispatchData.course[driverIndexState].mileage}
            totalOrder={dispatchData.course[driverIndexState].orderNum}
            availabilityOrder={80}
            floorAreaRatio={dispatchData.course[driverIndexState].floorAreaRatio}
            driverName={dispatchData.course[driverIndexState].smName}
            driverPhoneNumber={dispatchData.course[driverIndexState].smPhoneNumber}
            vehicleType={dispatchData.course[driverIndexState].vehicleType}
            vehicleTon={dispatchData.course[driverIndexState].vehicleTon}
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
