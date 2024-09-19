import Icon, { IconId } from "@/components/core/Icon";
import DeliveryStatusTag from "@/components/DeliveryStatusTag";
import DeliveryStopoverListCard from "@/components/DeliveryRoutine/DeliveryStopoverListCard";
import CircleCheckbox from "./CircleCheckbox";
import React, { useEffect, useRef, useState } from "react";
import IAmMoving from "./IAmMoving";
import DeliveryModal from "@/components/detailModal/DeliveryModal";
import OrderModal from "@/components/detailModal/OrderModal";
import IAmResting from "./IAmResting";
import { LocalTime } from "@/models/ApiTypes";

// DeliveryRoutineDetailStatusItem 정의 추가
export interface DeliveryRoutineDetailStatusItem {
  dispatchDetailId?: number;
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
  transportOrderId?: number;
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
  selectedDispatchDetailId: number | null;
  refreshSideTabData: () => Promise<void>;
}

const DeliveryRoutineDetail = ({
  selectedOrders,
  setSelectedOrders,
  fetchData,
  selectedDispatchDetailId,
  refreshSideTabData,
}: DeliveryRoutineDetailProps) => {
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedDestinationIdForModal, setSelectedDestinationIdForModal] = useState<number | null>(null);
  const [selectedTransportOrderId, setSelectedTransportOrderId] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedDispatchDetailId && scrollContainerRef.current) {
      const element = document.getElementById(`delivery-item-${selectedDispatchDetailId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [selectedDispatchDetailId]);

  const handleAddressInfo = (item: DeliveryRoutineDetailStatusItem, event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    if (item.destinationId > 0) {
      setSelectedDestinationIdForModal(item.destinationId);
      setIsDeliveryModalOpen(true);
    } else {
      alert("배송처 정보 없음");
    }
  };

  const handleOrderInfo = (item: DeliveryRoutineDetailStatusItem) => {
    if (item.transportOrderId && item.transportOrderId > 0) {
      setSelectedTransportOrderId(item.transportOrderId);
      setIsOrderModalOpen(true);
      console.log("item.transportOrderId", item.transportOrderId);
    } else {
      alert("주문 정보 없음");
    }
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

  const parseAddress = (fullAddress: string): { address: string } => {
    // 특별시, 광역시, 특별자치시, 특별자치도를 간단히 표시하는 함수
    const simplifyCity = (city: string): string => {
      return city
        .replace(/특별시|광역시|특별자치시/, "시")
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
        address: `${simplifiedCity} ${match[2]} ${match[3]}`,
      };
    }

    // 매칭되지 않으면 원래 주소를 간단히 표시하여 반환
    return {
      address: simplifyCity(fullAddress),
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

  const truncateAddress = (address: string, maxLength: number) => {
    return address.length > maxLength ? address.slice(0, maxLength) + "..." : address;
  };

  return (
    <>
      <div ref={scrollContainerRef} className="flex flex-col gap-[12px] overflow-scroll scrollbar-hide">
        {shouldInsertResting && (
          <IAmResting breakStartTime={changedBreakStartTime} breakEndTime={changedBreakEndTime} />
        )}
        {fetchListItems.map((item, index) => {
          const { address } = parseAddress(item.address);
          const maxLength = item.dispatchDetailStatus === "CANCELED" ? 20 : 13;
          const displayAddress = truncateAddress(address, maxLength);
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
          const isDisabled = item.destinationId === 0 && item.dispatchDetailStatus !== "CANCELED";
          const isHighlighted = item.dispatchDetailId === selectedDispatchDetailId;
          return (
            <React.Fragment key={index}>
              {index === 0 && item.dispatchDetailStatus === "WORK_WAITING" && <IAmMoving ett={fetchData.ett ?? 0} />}
              {index > 0 &&
                ["WORK_COMPLETED", "RESTING", "CANCELED"].includes(fetchListItems[index - 1].dispatchDetailStatus) &&
                fetchListItems
                  .slice(0, index)
                  .every((item) => ["WORK_COMPLETED", "RESTING", "CANCELED"].includes(item.dispatchDetailStatus)) &&
                item.dispatchDetailStatus === "WORK_WAITING" && <IAmMoving ett={fetchData.ett ?? 0} />}
              <div id={`delivery-item-${item.dispatchDetailId}`} className="flex w-[430px] justify-between">
                <CircleCheckbox
                  status={item.dispatchDetailStatus}
                  order={orderNumber ?? -1}
                  initialState={selectedOrders.some((o) => o === item)}
                  onChange={(e, checked) => handleCheckboxChange(index, checked, item)}
                  delayedTime={item.delayedTime}
                  destinationComment={item.destinationComment}
                />
                <DeliveryStopoverListCard
                  onClick={() => handleOrderInfo(item)}
                  background={isHighlighted ? "delayed" : item.dispatchDetailStatus === "default" ? "start" : undefined}
                  border={
                    isHighlighted ? "delayed" : item.dispatchDetailStatus === "CANCELED" ? "restOrCancel" : undefined
                  }
                  height={
                    item.dispatchDetailStatus === "DELIVERY_DELAY" && item.delayedTime && item.destinationComment
                      ? "delayedAndComment"
                      : "default"
                  }
                >
                  <div className="flex flex-col gap-[8px]">
                    <ul className={`${item.dispatchDetailStatus === "CANCELED" ? "text-gray-300" : ""} `}>
                      <li className="flex items-center gap-[8px]">
                        <DeliveryStatusTag vehicleStatus={item.dispatchDetailStatus || "default"}></DeliveryStatusTag>
                        <p
                          className={`cursor-pointer border-b border-blue-500 -tracking-[-1px] text-T-16-M ${
                            item.dispatchDetailStatus === "CANCELED"
                              ? "border-gray-300 text-gray-300"
                              : "text-ellipsis whitespace-nowrap text-blue-500"
                          } ${item.dispatchDetailStatus === "RESTING" ? "hidden" : ""} ${isDisabled ? "!cursor-default border-none text-gray-700" : ""}`}
                          onClick={!isDisabled ? (event) => handleAddressInfo(item, event) : undefined}
                          style={{ letterSpacing: "-1px" }}
                          title={address}
                        >
                          {displayAddress}
                        </p>
                      </li>
                    </ul>
                    <ul className={`${item.delayedTime ? "" : "hidden"}`}>
                      <li
                        className={`flex items-center gap-[4px] ${item.delayedTime ? "text-red-500 text-B-14-M" : "hidden"} ${item.dispatchDetailStatus === "RESTING" || item.dispatchDetailStatus === "CANCELED" ? "hidden" : ""} `}
                      >
                        <Icon id="warning" size={14} className="text-red-500" />
                        <p>시작 예상 시간 {item.delayedTime}분 초과</p>
                      </li>
                    </ul>
                    <ul className={`${item.destinationComment ? "" : "hidden"}`}>
                      <li
                        className={`flex items-center gap-[4px] ${item.destinationComment ? "text-B-14-M" : "hidden"} ${item.dispatchDetailStatus === "RESTING" || item.dispatchDetailStatus === "CANCELED" ? "hidden" : ""} `}
                      >
                        <Icon id="circleAlertFill" size={14} />
                        <p>{item.destinationComment}</p>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={`flex h-[56px] flex-col justify-center text-nowrap text-B-14-M ${
                      item.dispatchDetailStatus === "CANCELED" ? "hidden" : "text-gray-700"
                    }`}
                  >
                    <ul className="flex flex-col gap-[8px]">
                      <li className="flex items-center justify-between gap-[4px]">
                        {startTimeLabel} <span>{displayStartTime}</span>
                      </li>
                      <li className="flex items-center justify-between gap-[4px]">
                        {endTimeLabel} <span>{displayEndTime}</span>
                      </li>
                    </ul>
                  </div>
                </DeliveryStopoverListCard>
              </div>
              {/* {item.dispatchDetailStatus === "WORK_COMPLETED" &&
                fetchListItems[index + 1]?.dispatchDetailStatus === "WORK_WAITING" && (
                  <IAmMoving ett={fetchData.ett ?? 0} />
                )} */}
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
      {isDeliveryModalOpen && selectedDestinationIdForModal && (
        <DeliveryModal
          id={selectedDestinationIdForModal}
          isCenter={false}
          onClose={() => setIsDeliveryModalOpen(false)}
        />
      )}
      {isOrderModalOpen && selectedTransportOrderId && (
        <OrderModal id={selectedTransportOrderId} onClose={() => setIsOrderModalOpen(false)} />
      )}
    </>
  );
};

export default DeliveryRoutineDetail;
