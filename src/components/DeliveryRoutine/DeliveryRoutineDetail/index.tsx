import Icon, { IconId } from "@/components/core/Icon";
import DeliveryStatusTag from "@/components/DeliveryStatusTag";
import DeliveryStopoverListCard from "@/components/DeliveryRoutine/DeliveryStopoverListCard";
import CircleCheckbox from "./CircleCheckbox";
import React from "react";
import IAmMoving from "./IAmMoving";

// DeliveryRoutineDetailStatusItem 정의 추가
export interface DeliveryRoutineDetailStatusItem {
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
  errorMessage?: string;
}

interface DeliveryRoutineDetailProps {
  selectedOrders: DeliveryRoutineDetailStatusItem[];
  setSelectedOrders: React.Dispatch<React.SetStateAction<DeliveryRoutineDetailStatusItem[]>>;
  fetchData: {
    dispatchDetailList: DeliveryRoutineDetailStatusItem[];
    ett?: number;
  };
}

const DeliveryRoutineDetail = ({ selectedOrders, setSelectedOrders, fetchData }: DeliveryRoutineDetailProps) => {
  let orderCounter = 0;

  // fetchListItems의 타입을 명시적으로 지정
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
      return city.replace(/특별시|광역시|특별자치시/, "시").replace(/특별자치도/, "도");
    };

    const regex = /(.*?[시도군구])\s(.*?[동읍면])\s(.+)/;
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

  return (
    <div className="flex flex-col gap-[12px] overflow-scroll scrollbar-hide">
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

        const shouldDisplayOrder = item.dispatchDetailStatus !== "CANCELED" && item.dispatchDetailStatus !== "RESTING";
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
              />
              <DeliveryStopoverListCard background={item.dispatchDetailStatus === "default" ? "start" : undefined}>
                <div className="flex flex-col gap-[8px]">
                  <ul className={`${item.dispatchDetailStatus === "CANCELED" ? "text-gray-300" : ""} `}>
                    <li className="flex items-center gap-[8px]">
                      <DeliveryStatusTag vehicleStatus={item.dispatchDetailStatus || "default"}></DeliveryStatusTag>
                      <p
                        className={`cursor-pointer text-nowrap border-b border-blue-500 text-T-16-M ${
                          item.dispatchDetailStatus === "CANCELED" ? "border-gray-300 text-gray-300" : "text-blue-500"
                        } ${item.dispatchDetailStatus === "RESTING" ? "hidden" : ""} `}
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
                  <ul className="h-[20px]">
                    <li
                      className={`flex h-[20px] items-center gap-[4px] ${item.errorMessage ? "text-B-14-M" : "hidden"} ${item.dispatchDetailStatus === "RESTING" || item.dispatchDetailStatus === "CANCELED" ? "hidden" : ""} `}
                    >
                      <Icon id="circleAlertFill" size={14} />
                      <p>{item.errorMessage}</p>
                    </li>
                  </ul>
                </div>
                <ul
                  className={`flex flex-col items-end gap-[8px] text-nowrap text-B-14-M ${
                    item.dispatchDetailStatus === "CANCELED" ? "hidden" : "text-gray-700"
                  }`}
                >
                  <li>
                    {startTimeLabel} <span>{displayStartTime}</span>
                  </li>
                  <li>
                    {endTimeLabel} <span>{displayEndTime}</span>
                  </li>
                </ul>
              </DeliveryStopoverListCard>
            </div>
            {item.dispatchDetailStatus === "WORK_COMPLETED" &&
              fetchListItems[index + 1]?.dispatchDetailStatus === "WORK_WAITING" && (
                <IAmMoving ett={fetchData.ett ?? 0} />
              )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default DeliveryRoutineDetail;
