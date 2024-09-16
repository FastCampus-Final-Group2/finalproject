import DeliveryStatusTag from "@/components/DeliveryStatusTag";
import CircleCheckbox from "./CircleCheckbox";
import DeliveryStopoverListCard from "@/components/DeliveryRoutine/DeliveryStopoverListCard";

const IAmResting = ({ breakStartTime, breakEndTime }: { breakStartTime: string; breakEndTime: string }) => {
  const formatTime = (time: string) => {
    return time.substring(11, 16); // "HH:MM" 형식만 반환
  };

  const isTimeAfter = (timeToCompare: string) => {
    const now = new Date();
    const compareTime = new Date(timeToCompare);
    return now > compareTime;
  };

  return (
    <div>
      <div className="flex w-[430px] justify-between">
        <CircleCheckbox status="RESTING" order={0} />
        <DeliveryStopoverListCard border="restOrCancel">
          <div className="flex h-full gap-[8px]">
            <DeliveryStatusTag vehicleStatus="RESTING" />
          </div>
          <ul className="flex flex-col items-end gap-[8px] text-nowrap text-gray-700 text-B-14-M">
            <li className="flex items-center gap-[4px]">
              <p>{isTimeAfter(breakStartTime) ? "시작" : "시작 예정"}</p>
              <p>{formatTime(breakStartTime)}</p>
            </li>
            <li className="flex items-center gap-[4px]">
              <p>{isTimeAfter(breakEndTime) ? "종료" : "종료 예정"}</p>
              <p>{formatTime(breakEndTime)}</p>
            </li>
          </ul>
        </DeliveryStopoverListCard>
      </div>
    </div>
  );
};

export default IAmResting;
