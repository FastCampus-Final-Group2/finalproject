import Icon from "@/components/core/Icon";
import { BG_50 } from "@/styles/smColor";
import { ColorProps } from "@/components/SideTapDriverDetail/StopOverList";
import { CourseDetailResponse, LocalTime } from "@/models/ApiTypes";
import DeliveryModal from "@/components/detailModal/DeliveryModal";
import { useState } from "react";

interface StopOverProps extends ColorProps, CourseDetailResponse {
  index: number;
  totalLength: number;
  isExpanded: boolean;
}

const StopOver = ({
  index,
  totalLength,
  restrictedTonCode,
  delayRequestTime,
  overContractNum,
  bgColor,
  roadAddress,
  detailAddress,
  orderType,
  expectationOperationStartTime = "",
  expectationOperationEndTime = "",
  ett,
  distance,
  isExpanded,
  breakStartTime,
  breakEndTime,
  deliveryDestinationId,
}: StopOverProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const LocalformatTime = (time: string | LocalTime): string => {
    if (typeof time === "string") {
      const date = new Date(`1970-01-01T${time}`);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    } else if (typeof time === "object" && time.hour !== undefined && time.minute !== undefined) {
      const hours = time.hour.toString().padStart(2, "0");
      const minutes = time.minute.toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    }
    return "";
  };
  const formatTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };
  const calculateTimeDifferenceInMinutes = (startTime: string, endTime: string): number => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const diffInMilliseconds = end.getTime() - start.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

    return diffInMinutes;
  };

  const LocalcalculateTimeDifferenceInMinutes = (
    startTime: string | LocalTime,
    endTime: string | LocalTime,
  ): number | undefined => {
    let startDate: Date | undefined = undefined;
    let endDate: Date | undefined = undefined;

    // startTime 처리
    if (typeof startTime === "string") {
      startDate = new Date(`1970-01-01T${startTime}`);
    } else if (typeof startTime === "object" && startTime.hour !== undefined && startTime.minute !== undefined) {
      startDate = new Date(1970, 0, 1, startTime.hour, startTime.minute);
    }

    // endTime 처리
    if (typeof endTime === "string") {
      endDate = new Date(`1970-01-01T${endTime}`);
    } else if (typeof endTime === "object" && endTime.hour !== undefined && endTime.minute !== undefined) {
      endDate = new Date(1970, 0, 1, endTime.hour, endTime.minute);
    }

    // startDate와 endDate가 유효한지 확인
    if (startDate && endDate) {
      const diffInMilliseconds = endDate.getTime() - startDate.getTime();
      return Math.floor(diffInMilliseconds / (1000 * 60)); // 분 단위로 변환
    }

    // startDate 또는 endDate가 유효하지 않으면 undefined 반환
    return undefined;
  };

  const getErrorMessage = (
    restrictedTonCode: boolean = false,
    delayRequestTime: boolean = false,
    overContractNum: boolean = false,
  ): JSX.Element[] => {
    const errorMessages: JSX.Element[] = [];

    if (restrictedTonCode) {
      errorMessages.push(
        <div className="inline-flex items-center gap-[4px]">
          <Icon id="warning" size={14} className="text-red-500" />
          <div className="text-center text-red-500 text-B-14-M">진입 제한 조건</div>
        </div>,
      );
    }

    if (delayRequestTime) {
      errorMessages.push(
        <div className="inline-flex items-center gap-[4px]">
          <Icon id="warning" size={14} className="text-red-500" />
          <div className="text-center text-red-500 text-B-14-M">희망도착시간 미준수</div>
        </div>,
      );
    }

    if (overContractNum) {
      errorMessages.push(
        <div className="inline-flex items-center gap-[4px]">
          <Icon id="warning" size={14} className="text-red-500" />
          <div className="text-center text-red-500 text-B-14-M">작업희망일 미준수</div>
        </div>,
      );
    }

    return errorMessages;
  };

  return (
    <div className="inline-flex items-start justify-start gap-[20px] self-stretch">
      <div className="inline-flex flex-col items-center justify-start gap-[12px] self-stretch">
        {!(index === 0 && isExpanded) && <div className="h-[52px] border-2 border-dashed"></div>}
        {breakStartTime && breakEndTime ? (
          <div className="flex h-[24px] w-[24px] flex-col items-center justify-center gap-[12px] rounded-[100px] bg-orange-500">
            <Icon id="coffee" size={14} className="text-white" />
          </div>
        ) : (
          <div className="flex h-[24px] w-[24px] flex-col items-center justify-center gap-[12px] rounded-[100px] bg-[#191919]">
            <div className="text-center leading-[14.40px] text-white text-C-12-M">{index + 1}</div>
          </div>
        )}

        {index < totalLength - 1 && <div className="shrink grow basis-0 border-2 border-dashed"></div>}
      </div>
      <div className="inline-flex w-[332px] flex-col items-start justify-start">
        {!(index === 0 && isExpanded) && (
          <div
            className={`inline-flex h-[52px] items-center justify-start gap-[8px] self-stretch ${BG_50[bgColor]} px-[8px] py-[16px]`}
          >
            {!isExpanded && !(breakStartTime && breakEndTime) && (
              <div className="inline-flex items-center justify-start gap-[8px]">
                <div className="flex items-center justify-start">
                  <div className="text-center text-gray-700 text-B-14-R">{distance?.toFixed(1)}</div>
                  <div className="text-center text-gray-700 text-B-14-R">km</div>
                </div>
                <div className="h-[0px] w-[12px] rotate-90 border border-gray-200"></div>
                <div className="flex items-center justify-start">
                  <div className="text-center text-gray-900 text-B-14-M">{ett}</div>
                  <div className="text-center">
                    <span className="text-gray-900 text-B-14-R">분 </span>
                    <span className="text-gray-700 text-B-14-R">소요예상</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex w-full flex-col items-start justify-start gap-[12px] rounded-lg bg-white p-[16px]">
          {!(breakStartTime && breakEndTime) && (
            <div className="flex flex-col items-start justify-start gap-[4px] self-stretch">
              <div className="inline-flex items-center justify-start gap-[8px] self-stretch">
                <button
                  onClick={handleModalOpen}
                  className="flex items-center justify-start gap-[4px] truncate border-b border-blue-500 pt-[1px]"
                >
                  <div className="text-center text-blue-500 text-T-16-M">{roadAddress}</div>
                  <div className="text-center text-blue-500 text-T-16-M">{detailAddress}</div>
                </button>
              </div>

              {(restrictedTonCode || delayRequestTime || overContractNum) && (
                <div className="inline-flex flex-col items-start gap-[4px] self-stretch rounded">
                  {getErrorMessage(restrictedTonCode, delayRequestTime, overContractNum).map((message, index) => (
                    <div key={index}>{message}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="inline-flex items-center justify-center gap-[8px]">
            <div className="flex items-center justify-start gap-[4px]">
              {/* 휴게시간이 있을 경우 주황색 박스 */}
              {breakStartTime && breakEndTime ? (
                <div className="flex items-center justify-center gap-[4px] rounded bg-orange-500 px-[8px] py-[4px]">
                  <div className="text-center text-white text-B-14-B">휴게</div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-[4px] rounded bg-blue-400 px-[8px] py-[4px]">
                  <div className="text-center text-white text-B-14-B">{orderType}</div>
                </div>
              )}
              {breakStartTime && breakEndTime ? (
                <div className="flex items-center justify-center gap-[4px] rounded bg-gray-100 px-[8px] py-[4px]">
                  <Icon id="clock" size={14} className="text-gray-700" />
                  <div className="text-center text-gray-700 text-B-14-M">
                    {LocalcalculateTimeDifferenceInMinutes(breakStartTime, breakEndTime)}분
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-[4px] rounded bg-gray-100 px-[8px] py-[4px]">
                  <Icon id="clock" size={14} className="text-gray-700" />
                  <div className="text-center text-gray-700 text-B-14-M">
                    {calculateTimeDifferenceInMinutes(expectationOperationStartTime, expectationOperationEndTime)}분
                  </div>
                </div>
              )}
            </div>

            {breakStartTime && breakEndTime ? (
              <div className="flex h-[28px] items-center justify-end py-[4px]">
                <div className="flex items-center justify-start">
                  <div className="text-center text-gray-700 text-B-14-R">{LocalformatTime(breakStartTime)}</div>
                </div>
                <div className="text-center text-gray-700 text-B-14-R">~</div>
                <div className="flex items-center justify-start">
                  <div className="text-center text-gray-700 text-B-14-R">{LocalformatTime(breakEndTime)}</div>
                </div>
              </div>
            ) : (
              <div className="flex h-[28px] items-center justify-end py-[4px]">
                <div className="flex items-center justify-start">
                  <div className="text-center text-gray-700 text-B-14-R">
                    {formatTime(expectationOperationStartTime)}
                  </div>
                </div>
                <div className="text-center text-gray-700 text-B-14-R">~</div>
                <div className="flex items-center justify-start">
                  <div className="text-center text-gray-700 text-B-14-R">{formatTime(expectationOperationEndTime)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 모달 컴포넌트 렌더링 */}
      {isModalOpen && deliveryDestinationId && deliveryDestinationId !== 0 && (
        <DeliveryModal id={deliveryDestinationId} isCenter={false} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default StopOver;
