import { IconId } from "@/components/core/Icon";
import DeliveryStatusTag from "@/components/DeliveryStatusTag";
import DeliveryStopoverListCard from "@/components/DeliveryRoutine/DeliveryStopoverListCard";
import CircleCheckbox from "./CircleCheckbox";

// DeliveryRoutineDetailStatus 배열의 타입을 정의합니다
interface DeliveryRoutineDetailStatusItem {
  order: number;
  status: "delayed" | "completed" | "cancelled" | "waiting" | "default" | "";
  text: string;
  startTime: string;
  endTime: string;
  expectedStartTime: string;
  expectedEndTime: string;
  iconId: IconId;
  address: string;
  addressDetail: string;
}

const DeliveryRoutineDetailStatus: DeliveryRoutineDetailStatusItem[] = [
  {
    order: 1,
    status: "completed",
    text: "작업완료",
    startTime: "14:30",
    endTime: "15:00",
    expectedStartTime: "",
    expectedEndTime: "",
    iconId: "circleFill",
    address: "서울시 마포구 합정동",
    addressDetail: "331-7 360동 2503호",
  },
  {
    order: 2,
    status: "delayed",
    text: "배송지연",
    startTime: "14:00",
    endTime: "14:30",
    expectedStartTime: "",
    expectedEndTime: "",
    iconId: "circle",
    address: "서울시 마포구 합정동",
    addressDetail: "331-7 360동 2503호",
  },
  {
    order: 3,
    status: "cancelled",
    text: "작업취소",
    startTime: "",
    endTime: "",
    expectedStartTime: "",
    expectedEndTime: "",
    iconId: "circleDashFill",
    address: "서울시 마포구 합정동",
    addressDetail: "331-7 360동 2503호",
  },
  {
    order: 4,
    status: "waiting",
    text: "작업대기",
    startTime: "",
    endTime: "",
    expectedStartTime: "15:00",
    expectedEndTime: "15:30",
    iconId: "circle",
    address: "서울시 마포구 합정동",
    addressDetail: "331-7 360동 2503호",
  },
  {
    order: 5,
    status: "default",
    text: "작업시작",
    startTime: "15:30",
    endTime: "",
    expectedStartTime: "",
    expectedEndTime: "16:00",
    iconId: "circle",
    address: "서울시 마포구 합정동",
    addressDetail: "331-7 360동 2503호",
  },
];
const DeliveryRoutineDetail = () => {
  return (
    <div className="flex h-[355px] flex-col gap-[12px] overflow-scroll scrollbar-hide">
      {DeliveryRoutineDetailStatus.map((item) => {
        let startTimeLabel = "시작";
        let endTimeLabel = "종료";
        let displayStartTime = item.startTime;
        let displayEndTime = item.endTime;
        let maxWClass = "max-w-[50px]";

        switch (item.text) {
          case "작업시작":
            displayEndTime = item.expectedEndTime;
            endTimeLabel = "종료 예상";
            maxWClass = "max-w-[20px]";
            break;
          case "작업완료":
            break;
          case "배송지연":
            displayEndTime = "-- : --";
            break;
          case "작업대기":
            startTimeLabel = "시작 예상";
            endTimeLabel = "종료 예상";
            displayStartTime = item.expectedStartTime;
            displayEndTime = item.expectedEndTime;
            maxWClass = "max-w-[20px]";
            break;
          case "작업취소":
            maxWClass = "";
            break;
          default:
            break;
        }

        return (
          <div className="flex w-[430px] justify-between" key={item.order}>
            <CircleCheckbox iconId={item.iconId} status={item.status} order={item.order} />
            <DeliveryStopoverListCard background={item.status === "default" ? "start" : undefined}>
              <ul className={item.status === "cancelled" ? "text-gray-300" : ""}>
                <li className="flex items-center gap-[8px]">
                  <DeliveryStatusTag text={item.status || "default"}>{item.text}</DeliveryStatusTag>
                  {/* 주소 표시 부분 */}
                  <p
                    className={`cursor-pointer text-nowrap border-b border-blue-500 text-T-16-M ${
                      item.status === "cancelled" ? "border-gray-300 text-gray-300" : "text-blue-500"
                    }`}
                  >
                    {item.address}
                  </p>
                  <p
                    className={`overflow-hidden text-ellipsis whitespace-nowrap text-B-14-M ${
                      item.status === "cancelled" ? "text-gray-300" : "text-gray-500"
                    } ${maxWClass}`}
                  >
                    {item.addressDetail}
                  </p>
                </li>
              </ul>
              <ul
                className={`flex flex-col items-end gap-[8px] text-nowrap text-B-14-M ${item.status === "cancelled" ? "hidden" : "text-gray-700"}`}
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
        );
      })}
    </div>
  );
};

export default DeliveryRoutineDetail;
