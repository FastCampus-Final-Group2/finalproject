import Icon from "@/components/core/Icon";
import CircularProgressBar from "@/components/core/CircularProgressBar";
import { useRecoilState } from "recoil";
import { plusMinusEstimatedTimetState, plusMinusTotalOrdertState } from "@/atoms/plusMinus";

interface TotalOrderProps {
  totalOrders?: number;
  errorOrders?: number;
  estimatedTime?: number;
  capacityRate?: number;
}
const TotalOrder = ({ totalOrders = 0, errorOrders, estimatedTime, capacityRate }: TotalOrderProps) => {
  const [plusMinusTotalOrder] = useRecoilState(plusMinusTotalOrdertState);
  // const [plusMinusEstimatedTime] = useRecoilState(plusMinusEstimatedTimetState);

  return (
    <div className="inline-flex h-[116px] w-[460px] items-center justify-center gap-4 rounded-lg bg-white py-4 pl-6 pr-[23px]">
      <div className="flex h-[84px] w-[413px] items-center justify-between gap-4">
        {/* 총 주문 */}
        <div className="flex h-[44px] w-[56px] flex-col items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <Icon id="order" size={14} className="text-gray-500" />
            <div className="h-[20px] w-[52px] text-gray-500 text-B-14-M">전체 주문</div>
          </div>
          <div className="flex h-[44px] w-[56px] items-center justify-end text-right">
            <div className="text-blue-500 text-T-20-B">{totalOrders - plusMinusTotalOrder}</div>
            <div className="text-gray-700 text-T-16-B">건</div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-[60px] w-[0px] border border-gray-50"></div>

        {/* 오류 주문 */}
        <div className="flex h-[44px] w-[68px] flex-col items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <Icon id="warning" size={14} className="text-gray-500" />
            <div className="h-[20px] w-[52px] text-gray-500 text-B-14-M">오류 주문</div>
          </div>
          <div className="flex h-[44px] w-[68px] items-center justify-end text-right">
            <div className="text-red-500 text-T-20-B">{errorOrders}</div>
            <div className="text-gray-700 text-T-16-B">건</div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-[60px] w-[0px] border border-gray-50"></div>

        {/* 예상 시간 */}
        <div className="flex h-[44px] w-[68px] flex-col items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <Icon id="clock" size={14} className="text-gray-500" />
            <div className="h-[20px] w-[52px] text-gray-500 text-B-14-M">예상 시간</div>
          </div>
          <div className="flex h-[44px] w-[80px] items-center justify-end text-right">
            <div className="text-blue-500 text-T-20-B">
              {estimatedTime !== undefined && <>{Math.floor(estimatedTime / 60)}</>}
            </div>
            <div className="inline-flex flex-col items-center justify-center gap-3 pb-0.5 pt-[3px]">
              <div className="text-gray-700 text-T-16-B">시간</div>
            </div>
            <div className="text-blue-500 text-T-20-B">{estimatedTime !== undefined && <>{estimatedTime % 60}</>}</div>
            <div className="inline-flex flex-col items-center justify-center gap-3 pb-0.5 pt-[3px]">
              <div className="text-gray-700 text-T-16-B">분</div>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-[60px] w-[0px] border border-gray-50"></div>

        {/* 용적률 */}
        <CircularProgressBar percentage={capacityRate ?? 0} bgColor={"blue"} />
      </div>
    </div>
  );
};

export default TotalOrder;
