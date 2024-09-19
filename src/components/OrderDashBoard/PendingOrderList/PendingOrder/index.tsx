import { isClickPendingOrderListState, selectedPendingState } from "@/atoms/dispatchData";
import { LocalTime } from "@/models/ApiTypes";
import { useSetRecoilState } from "recoil";

interface PendingOrderProps extends LocalTime {
  index: number;
  address?: string;
  meter?: number;
  kilogram?: number;
  serviceRequestDate?: string;
  serviceRequestTime?: string;
}
const PendingOrder = ({
  index,
  address,
  meter,
  kilogram,
  serviceRequestDate = "",
  serviceRequestTime = "",
}: PendingOrderProps) => {
  const formatServiceRequest = (dateString: string, time: string | LocalTime): string => {
    let date: Date;

    // time이 문자열인 경우
    if (typeof time === "string") {
      date = new Date(`${dateString}T${time}`);
    }
    // time이 LocalTime 객체인 경우
    else if (typeof time === "object" && time.hour !== undefined && time.minute !== undefined) {
      date = new Date(dateString);
      date.setHours(time.hour, time.minute, time.second || 0, time.nano ? time.nano / 1000000 : 0);
    } else {
      throw new Error("Invalid time format");
    }

    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${month}월${day}일 ${hours}:${minutes}`;
  };

  const formattedString = formatServiceRequest(serviceRequestDate, serviceRequestTime);

  const setSelectedPending = useSetRecoilState(selectedPendingState);
  const setIsClickPendingOrderList = useSetRecoilState(isClickPendingOrderListState);

  const handleClickPendingOrder = () => {
    setSelectedPending(index);
    setIsClickPendingOrderList(true);
  };

  return (
    <div
      className="inline-flex h-[36px] items-center justify-start self-stretch rounded bg-white py-[2px] pl-[12px]"
      role="button"
      onClick={handleClickPendingOrder}
    >
      <div className="flex items-center justify-start gap-[12px] py-[6px]">
        <div className="inline-flex h-[24px] w-[24px] flex-col items-center justify-center gap-[12px] rounded-[100px] bg-gray-700">
          <div className="text-center text-12 font-B leading-[14.40px] text-white">A</div>
        </div>
      </div>
      <div className="flex items-center justify-start gap-[14px]">
        <div className="flex items-center justify-start gap-2 px-2 py-1.5">
          <div className="flex w-[113px] items-center justify-center py-0.5">
            <div className="truncate text-gray-900 text-B-14-R">{address}</div>
          </div>
          <div className="h-[20px] w-[0px] border border-gray-200"></div>
          <div className="flex w-[108px] items-center justify-start">
            <div className="flex items-center justify-center py-0.5">
              <div className="min-w-[10px] text-gray-700 text-B-14-R">{meter}</div>
              <div className="text-gray-700 text-B-14-R">㎥</div>
            </div>
            <div className="text-gray-900 text-B-14-R">・</div>
            <div className="flex items-center justify-center py-0.5">
              <div className="min-w-[10px] leading-[16.80px] text-gray-900 text-B-14-R">{kilogram}</div>
              <div className="leading-[16.80px] text-gray-700 text-B-14-R">kg</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start rounded bg-gray-100 p-2">
          <div className="flex items-center justify-start">
            <div className="text-gray-700 text-B-14-M">{formattedString}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingOrder;
