import Icon, { IconId } from "@/components/core/Icon";
import DeliveryStatusTag from "@/components/DeliveryStatusTag";
import DeliveryStopoverListCard from "@/components/DeliveryRoutine/DeliveryStopoverListCard";
import CircleCheckbox from "./CircleCheckbox";
import React, { useState } from "react";
import IAmMoving from "./IAmMoving";
import DeliveryModal from "@/components/detailModal/DeliveryModal";
import IAmResting from "./IAmResting";
import { LocalTime } from "@/models/ApiTypes";

// DeliveryRoutineDetailStatusItem 정의 추가
export interface DeliveryRoutineDetailStatusItem {
  dispatchDetailId: number;
  destinationId: number; // 이 줄을 추가
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
  operationStartTime?: string;
  operationEndTime?: string;
  expectationOperationStartTime?: string;
  expectationOperationEndTime?: string;
  iconId: IconId;
  address: string;
  addressDetail: string;
  destinationComment?: string;
  delayedTime?: number;
  isDelay?: boolean;
}

interface DeliveryRoutineDetailProps {
  selectedOrders: DeliveryRoutineDetailStatusItem[];
  setSelectedOrders: React.Dispatch<React.SetStateAction<DeliveryRoutineDetailStatusItem[]>>;
  fetchData: {
    dispatchDetailList: DeliveryRoutineDetailStatusItem[];
    ett?: number;
    breakStartTime?: LocalTime;
    breakEndTime?: LocalTime;
    startStopover?: {
      departureTime: LocalTime;
    };
  };
}

const DeliveryRoutineDetail = ({ selectedOrders, setSelectedOrders, fetchData }: DeliveryRoutineDetailProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDestinationId, setSelectedDestinationId] = useState<number | null>(null);
  const handleAddressInfo = (item: DeliveryRoutineDetailStatusItem) => {
    setSelectedDestinationId(item.destinationId);
    setIsModalOpen(true);
  };

  let orderCounter = 0;

  const fetchListItems: DeliveryRoutineDetailStatusItem[] = fetchData.dispatchDetailList;

  const formatTime = (dateTimeString: string | undefined): string => {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const parseAddress = (fullAddress: string): { address: string; addressDetail: string } => {
    // 특별시, 광역시, 특별자치시, 특별자치도를 간단히 표시하는 함수
    const simplifyCity = (city: string): string => {
      return city
        .replace(/특별시|광역시|특별자치시/, "")
        .replace(/특별자치도/, "도")
        .replace(/경상북도/, "경북")
        .replace(/경상남도/, "경남")
        .replace(/전라북도/, "전북")
        .replace(/전라남도/, "전남")
        .replace(/충청북도/, "충북")
        .replace(/충청남도/, "충남");
    };

    const regex = /(.*?[시도군구])\s(.*?[동읍면가])\s(.+)/;
    const match = fullAddress.match(regex);

    if (match) {
      const simplifiedCity = simplifyCity(match[1]);
      return {
        address: `${simplifiedCity} ${match[2]}`,
        addressDetail: match[3],
      };
    }

    // 매칭되지 않으면 원래 주소를 간단히 표시하여 반환
    return {
      address: simplifyCity(fullAddress),
      addressDetail: "",
    };
  };

  const handleCheckboxChange = (order: number, checked: boolean, item: DeliveryRoutineDetailStatusItem) => {
    setSelectedOrders((prevSelectedOrders) =>
      checked ? [...prevSelectedOrders, item] : prevSelectedOrders.filter((o) => o !== item),
    );
  };

  // breakTime 처리
  const breakStartTime = fetchData.breakStartTime;
  const breakEndTime = fetchData.breakEndTime;
  const departureTime = fetchData.startStopover?.departureTime;
  const datePart = departureTime?.toString().split("T")[0] ?? new Date().toISOString().split("T")[0];
  const changedBreakStartTime = breakStartTime ? `${datePart}T${breakStartTime.toString()}` : undefined;
  const changedBreakEndTime = breakEndTime ? `${datePart}T${breakEndTime.toString()}` : undefined;

  // 1. changedBreakStartTime이 departureTime보다 크고 changedBreakEndTime이 expectationOperationStartTime보다 작을 때 index의 맨 앞에 끼워넣기
  // 2. changedBreakStartTime이 직전 index의 operationEndTime보다 크고 changedBreakEndTime이 바로 다음 index의 operationStartTime보다 작을 때 그 사이에 끼워넣기
  // 3. changedBreakStartTime이 직전 index의 expectationOperationEndTime보다 작고 changedBreakEndTime이 바로 다음 index의 expectationOperationStartTime보다 작을 때 그 사이에 끼워넣기
  // 4. changedBreakStartTime이 맨 마지막 index의 expectationOperationEndTime보다 큰 경우 맨 뒤에 끼워넣기
  const shouldInsertResting =
    changedBreakStartTime &&
    changedBreakEndTime &&
    departureTime &&
    fetchListItems.length > 0 &&
    fetchListItems[0].expectationOperationStartTime &&
    changedBreakStartTime > departureTime &&
    changedBreakEndTime < fetchListItems[0].expectationOperationStartTime;

  const lastItem = fetchListItems[fetchListItems.length - 1];
  const shouldAppendResting =
    changedBreakStartTime &&
    changedBreakEndTime &&
    lastItem &&
    lastItem.expectationOperationEndTime &&
    changedBreakStartTime > lastItem.expectationOperationEndTime;

  return (
    <>
      <div className="flex flex-col gap-[12px] overflow-scroll scrollbar-hide">
        {shouldInsertResting && (
          <IAmResting breakStartTime={changedBreakStartTime} breakEndTime={changedBreakEndTime} />
        )}
        {fetchListItems.map((item, index) => {
          const { address, addressDetail } = parseAddress(item.address);
          let startTimeLabel = "시작";
          let endTimeLabel = "종료";
          let displayStartTime = formatTime(item.operationStartTime);
          let displayEndTime = formatTime(item.operationEndTime);
          let maxWClass = "max-w-[50px]";

          switch (item.dispatchDetailStatus) {
            case "WORK_START":
              displayEndTime = formatTime(item.expectationOperationEndTime);
              endTimeLabel = "종료 예상";
              maxWClass = "max-w-[20px]";
              break;
            case "WORK_COMPLETED":
              break;
            case "DELIVERY_DELAY":
              displayEndTime = "-- : --";
              break;
            case "WORK_WAITING":
              startTimeLabel = "시작 예상";
              endTimeLabel = "종료 예상";
              displayStartTime = formatTime(item.expectationOperationStartTime);
              displayEndTime = formatTime(item.expectationOperationEndTime);
              maxWClass = "max-w-[20px]";
              break;
            case "CANCELED":
              maxWClass = "";
              break;
            default:
              break;
          }

          const shouldDisplayOrder =
            item.dispatchDetailStatus !== "CANCELED" && item.dispatchDetailStatus !== "RESTING";
          const orderNumber = shouldDisplayOrder ? ++orderCounter : undefined;

          return (
            <React.Fragment key={index}>
              {index === 0 && item.dispatchDetailStatus === "WORK_WAITING" && <IAmMoving ett={fetchData.ett ?? 0} />}
              <div className="flex w-[430px] justify-between">
                <CircleCheckbox
                  status={item.dispatchDetailStatus}
                  order={orderNumber ?? -1}
                  initialState={selectedOrders.some((o) => o === item)}
                  onChange={(e, checked) => handleCheckboxChange(index, checked, item)}
                  delayedTime={item.delayedTime}
                />
                <DeliveryStopoverListCard
                  className={item.delayedTime ? "border-red-500 bg-red-30" : ""}
                  background={item.dispatchDetailStatus === "default" ? "start" : undefined}
                >
                  <div className="flex flex-col gap-[8px]">
                    <ul className={`${item.dispatchDetailStatus === "CANCELED" ? "text-gray-300" : ""} `}>
                      <li className="flex items-center gap-[8px]">
                        <DeliveryStatusTag vehicleStatus={item.dispatchDetailStatus || "default"}></DeliveryStatusTag>
                        <p
                          className={`cursor-pointer text-nowrap border-b border-blue-500 -tracking-[-1px] text-T-16-M ${
                            item.dispatchDetailStatus === "CANCELED" ? "border-gray-300 text-gray-300" : "text-blue-500"
                          } ${item.dispatchDetailStatus === "RESTING" ? "hidden" : ""} `}
                          onClick={() => handleAddressInfo(item)}
                          style={{ letterSpacing: "-1px" }}
                        >
                          {address}
                        </p>
                        <p
                          className={`overflow-hidden text-ellipsis whitespace-nowrap text-B-14-M ${
                            item.dispatchDetailStatus === "CANCELED" ? "text-gray-300" : "text-gray-500"
                          } ${maxWClass} ${item.dispatchDetailStatus === "RESTING" ? "hidden" : ""}`}
                        >
                          {addressDetail}
                        </p>
                      </li>
                    </ul>
                    <ul className={`${item.delayedTime ? "h-[20px]" : "hidden"}`}>
                      <li
                        className={`flex h-[20px] items-center gap-[4px] ${item.delayedTime ? "text-red-500 text-B-14-M" : "hidden"} ${item.dispatchDetailStatus === "RESTING" || item.dispatchDetailStatus === "CANCELED" ? "hidden" : ""} `}
                      >
                        <Icon id="warning" size={14} className="text-red-500" />
                        <p>시작 예상 시간 {item.delayedTime}분 초과</p>
                      </li>
                    </ul>
                    <ul className="h-[20px]">
                      <li
                        className={`flex h-[20px] items-center gap-[4px] ${item.destinationComment ? "text-B-14-M" : "hidden"} ${item.dispatchDetailStatus === "RESTING" || item.dispatchDetailStatus === "CANCELED" ? "hidden" : ""} `}
                      >
                        <Icon id="circleAlertFill" size={14} />
                        <p>{item.destinationComment}</p>
                      </li>
                    </ul>
                  </div>
                  <ul
                    className={`flex flex-col items-end gap-[8px] text-nowrap text-B-14-M ${
                      item.dispatchDetailStatus === "CANCELED" ? "hidden" : "text-gray-700"
                    }`}
                  >
                    <li className="flex items-center justify-between gap-[4px]">
                      {startTimeLabel} <span>{displayStartTime}</span>
                    </li>
                    <li className="flex items-center justify-between gap-[4px]">
                      {endTimeLabel} <span>{displayEndTime}</span>
                    </li>
                  </ul>
                </DeliveryStopoverListCard>
              </div>
              {item.dispatchDetailStatus === "WORK_COMPLETED" &&
                fetchListItems[index + 1]?.dispatchDetailStatus === "WORK_WAITING" && (
                  <IAmMoving ett={fetchData.ett ?? 0} />
                )}
              {item.dispatchDetailStatus === "RESTING" &&
                fetchData.breakStartTime &&
                item.expectationOperationEndTime &&
                item.expectationOperationStartTime &&
                fetchData.breakStartTime < item.expectationOperationEndTime &&
                fetchData.breakEndTime &&
                fetchData.breakEndTime < item.expectationOperationStartTime && (
                  <IAmResting breakStartTime={changedBreakStartTime ?? ""} breakEndTime={changedBreakEndTime ?? ""} />
                )}
            </React.Fragment>
          );
        })}
        {shouldAppendResting && (
          <IAmResting breakStartTime={changedBreakStartTime} breakEndTime={changedBreakEndTime} />
        )}
      </div>
      {isModalOpen && (
        <DeliveryModal
          id={fetchData.dispatchDetailList[0].destinationId}
          isCenter={false}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default DeliveryRoutineDetail;
