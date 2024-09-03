"use client";

import Icon, { IconId } from "@/components/core/Icon";
import DeliveryStatusTag from "@/components/DeliveryStatusTag";
import DeliveryStopoverListCard from "@/components/DeliveryRoutine/DeliveryStopoverListCard";
import CircleCheckbox from "./CircleCheckbox";
import React from "react";
import IAmMoving from "./IAmMoving";

interface DeliveryRoutineDetailStatusItem {
  order: number;
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
  startTime?: string;
  endTime?: string;
  expectedStartTime?: string;
  expectedEndTime?: string;
  iconId: IconId;
  address: string;
  addressDetail: string;
  errorMessage?: string;
}

const DeliveryRoutineDetailStatus: DeliveryRoutineDetailStatusItem[] = [
  {
    order: 1,
    dispatchDetailStatus: "WORK_COMPLETED",
    startTime: "14:30",
    endTime: "15:00",
    expectedStartTime: "",
    expectedEndTime: "",
    iconId: "circleFill",
    address: "서울시 마포구 합정동",
    addressDetail: "331-7 360동 2503호",
    errorMessage: "화물 엘리베이터 대기시간 1시간",
  },
  {
    order: 2,
    dispatchDetailStatus: "WORK_WAITING",
    startTime: "",
    endTime: "",
    expectedStartTime: "15:00",
    expectedEndTime: "15:30",
    iconId: "circle",
    address: "서울시 마포구 합정동",
    addressDetail: "331-7 360동 2503호",
    errorMessage: "화물 엘리베이터 대기시간 1시간",
  },
  {
    order: 3,
    dispatchDetailStatus: "DELIVERY_DELAY",
    startTime: "14:00",
    endTime: "14:30",
    expectedStartTime: "",
    expectedEndTime: "",
    iconId: "circle",
    address: "서울시 마포구 합정동",
    addressDetail: "331-7 360동 2503호",
    errorMessage: "화물 엘리베이터 대기시간 1시간",
  },
  {
    order: 4,
    dispatchDetailStatus: "CANCELED",
    startTime: "",
    endTime: "",
    expectedStartTime: "",
    expectedEndTime: "",
    iconId: "circleDashFill",
    address: "서울시 마포구 합정동",
    addressDetail: "331-7 360동 2503호",
    errorMessage: "화물 엘리베이터 대기시간 1시간",
  },
  {
    order: 5,
    dispatchDetailStatus: "WORK_WAITING",
    startTime: "",
    endTime: "",
    expectedStartTime: "15:00",
    expectedEndTime: "15:30",
    iconId: "circle",
    address: "서울시 마포구 합정동",
    addressDetail: "331-7 360동 2503호",
    errorMessage: "화물 엘리베이터 대기시간 1시간",
  },
  {
    order: 6,
    dispatchDetailStatus: "WORK_START",
    startTime: "15:30",
    endTime: "",
    expectedStartTime: "",
    expectedEndTime: "16:00",
    iconId: "circle",
    address: "서울시 마포구 합정동",
    addressDetail: "331-7 360동 2503호",
    errorMessage: "화물 엘리베이터 대기시간 1시간",
  },
  {
    order: 7,
    dispatchDetailStatus: "RESTING",
    startTime: "15:30",
    endTime: "",
    expectedStartTime: "",
    expectedEndTime: "16:00",
    iconId: "circle",
    address: "서울시 마포구 합정동",
    addressDetail: "331-7 360동 2503호",
    errorMessage: "화물 엘리베이터 대기시간 1시간",
  },
];

const DeliveryRoutineDetail = () => {
  return (
    <div className="flex flex-col gap-[12px] overflow-scroll scrollbar-hide">
      {DeliveryRoutineDetailStatus.map((item, index) => {
        let startTimeLabel = "시작";
        let endTimeLabel = "종료";
        let displayStartTime = item.startTime;
        let displayEndTime = item.endTime;
        let maxWClass = "max-w-[50px]";

        switch (item.dispatchDetailStatus) {
          case "WORK_START":
            displayEndTime = item.expectedEndTime;
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
            displayStartTime = item.expectedStartTime;
            displayEndTime = item.expectedEndTime;
            maxWClass = "max-w-[20px]";
            break;
          case "CANCELED":
            maxWClass = "";
            break;
          default:
            break;
        }

        return (
          <React.Fragment key={item.order}>
            <div className="flex w-[430px] justify-between">
              {/* 체크박스 */}
              <CircleCheckbox status={item.dispatchDetailStatus} order={item.order} />
              {/* 목록을 감싸는 카드 */}
              <DeliveryStopoverListCard background={item.dispatchDetailStatus === "default" ? "start" : undefined}>
                <div className="flex flex-col gap-[8px]">
                  <ul className={`${item.dispatchDetailStatus === "CANCELED" ? "text-gray-300" : ""} `}>
                    <li className="flex items-center gap-[8px]">
                      {/* 운송 상태 태그 */}
                      <DeliveryStatusTag vehicleStatus={item.dispatchDetailStatus || "default"}></DeliveryStatusTag>
                      {/* 주소 표시 */}
                      <p
                        className={`cursor-pointer text-nowrap border-b border-blue-500 text-T-16-M ${
                          item.dispatchDetailStatus === "CANCELED" ? "border-gray-300 text-gray-300" : "text-blue-500"
                        } ${item.dispatchDetailStatus === "RESTING" ? "hidden" : ""} `}
                      >
                        {item.address}
                      </p>
                      <p
                        className={`overflow-hidden text-ellipsis whitespace-nowrap text-B-14-M ${
                          item.dispatchDetailStatus === "CANCELED" ? "text-gray-300" : "text-gray-500"
                        } ${maxWClass} ${item.dispatchDetailStatus === "RESTING" ? "hidden" : ""}`}
                      >
                        {item.addressDetail}
                      </p>
                    </li>
                  </ul>
                  {/* 에러메시지 */}
                  <ul className="h-[20px]">
                    <li
                      className={`flex h-[20px] items-center gap-[4px] ${item.errorMessage ? "text-B-14-M" : "hidden"} ${item.dispatchDetailStatus === "RESTING" || item.dispatchDetailStatus === "CANCELED" ? "hidden" : ""} `}
                    >
                      <Icon id="circleAlertFill" size={14} />
                      <p>{item.errorMessage}</p>
                    </li>
                  </ul>
                </div>
                {/* 시각 표시 */}
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
            {/* '작업완료'와 '작업대기' 사이에 '이동 중' 컴포넌트를 삽입 */}
            {item.dispatchDetailStatus === "WORK_COMPLETED" &&
              DeliveryRoutineDetailStatus[index + 1]?.dispatchDetailStatus === "WORK_WAITING" && <IAmMoving />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default DeliveryRoutineDetail;
