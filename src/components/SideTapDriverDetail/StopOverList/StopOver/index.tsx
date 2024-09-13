import Icon from "@/components/core/Icon";
import { BG_50 } from "@/styles/smColor";
import { ColorProps } from "@/components/SideTapDriverDetail/StopOverList";

interface StopOverProps extends ColorProps {
  index: number;
  totalLength: number;
  errorRestrictedTonCode: boolean;
  errorDelayRequestTime: boolean;
  errorOverContractNum: boolean;
  roadAddress: string;
  detailAddress: string;
  orderType: string;
  expectationOperationStartTime: string;
  expectationOperationEndTime: string;
  ett: number;
  distance: number;
  isExpanded: boolean;
}

const StopOver = ({
  index,
  totalLength,
  errorRestrictedTonCode,
  errorDelayRequestTime,
  errorOverContractNum,
  bgColor,
  roadAddress,
  detailAddress,
  orderType,
  expectationOperationStartTime,
  expectationOperationEndTime,
  ett,
  distance,
  isExpanded,
}: StopOverProps) => {
  const formatTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, "0"); // 시를 2자리로 맞춤
    const minutes = date.getMinutes().toString().padStart(2, "0"); // 분을 2자리로 맞춤

    return `${hours}:${minutes}`;
  };

  const calculateTimeDifferenceInMinutes = (startTime: string, endTime: string): number => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const diffInMilliseconds = end.getTime() - start.getTime(); // 밀리초 차이 계산
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60)); // 분 단위로 변환

    return diffInMinutes;
  };

  const getErrorMessage = (
    errorRestrictedTonCode: boolean,
    errorDelayRequestTime: boolean,
    errorOverContractNum: boolean,
  ): JSX.Element[] => {
    const errorMessages: JSX.Element[] = [];

    if (errorRestrictedTonCode) {
      errorMessages.push(
        <div className="inline-flex items-center gap-[4px]">
          <Icon id="warning" size={14} className="text-red-500" />
          <div className="text-center text-red-500 text-B-14-M">진입 제한 조건</div>
        </div>,
      );
    }

    if (errorDelayRequestTime) {
      errorMessages.push(
        <div className="inline-flex items-center gap-[4px]">
          <Icon id="warning" size={14} className="text-red-500" />
          <div className="text-center text-red-500 text-B-14-M">희망도착시간 미준수</div>
        </div>,
      );
    }

    if (errorOverContractNum) {
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
        <div className="flex h-[24px] w-[24px] flex-col items-center justify-center gap-[12px] rounded-[100px] bg-[#191919]">
          <div className="text-center leading-[14.40px] text-white text-C-12-M">{index + 1}</div>
        </div>
        {index < totalLength - 1 && <div className="shrink grow basis-0 border-2 border-dashed"></div>}
      </div>
      <div className="inline-flex w-[332px] flex-col items-start justify-start">
        {!(index === 0 && isExpanded) && (
          <div
            className={`inline-flex h-[52px] items-center justify-start gap-[8px] self-stretch ${BG_50[bgColor]} px-[8px] py-[16px]`}
          >
            {!isExpanded && (
              <div className="inline-flex items-center justify-start gap-[8px]">
                <div className="flex items-center justify-start">
                  <div className="text-center text-gray-700 text-B-14-R">{distance}</div>
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
          <div className="flex flex-col items-start justify-start gap-[4px] self-stretch">
            <div className="inline-flex items-center justify-start gap-[8px] self-stretch">
              <button className="flex items-center justify-start gap-[4px] border-b border-blue-500 pt-[1px]">
                <div className="text-center text-blue-500 text-T-16-M">{roadAddress}</div>
                <div className="text-center text-blue-500 text-T-16-M">{detailAddress}</div>
              </button>
            </div>

            {(errorRestrictedTonCode || errorDelayRequestTime || errorOverContractNum) && (
              <div className="inline-flex flex-col items-start gap-[4px] self-stretch rounded">
                {getErrorMessage(errorRestrictedTonCode, errorDelayRequestTime, errorOverContractNum).map(
                  (message, index) => (
                    <div key={index}>{message}</div>
                  ),
                )}
              </div>
            )}
          </div>
          <div className="inline-flex items-center justify-center gap-[8px]">
            <div className="flex items-center justify-start gap-[4px]">
              <div className="flex items-center justify-center gap-[4px] rounded bg-blue-400 px-[8px] py-[4px]">
                <div className="text-center text-white text-B-14-B">{orderType}</div>
              </div>
              <div className="flex items-center justify-center gap-[4px] rounded bg-gray-100 px-[8px] py-[4px]">
                <Icon id="clock" size={14} className="text-gray-700" />
                <div className="text-center text-gray-700 text-B-14-M">
                  {calculateTimeDifferenceInMinutes(expectationOperationStartTime, expectationOperationEndTime)}분
                </div>
              </div>
            </div>

            <div className="flex h-[28px] items-center justify-end py-[4px]">
              <div className="flex items-center justify-start">
                <div className="text-center text-gray-700 text-B-14-R">{formatTime(expectationOperationStartTime)}</div>
              </div>
              <div className="text-center text-gray-700 text-B-14-R">~</div>
              <div className="flex items-center justify-start">
                <div className="text-center text-gray-700 text-B-14-R">{formatTime(expectationOperationEndTime)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StopOver;
