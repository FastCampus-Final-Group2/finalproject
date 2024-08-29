import Icon from "@/components/core/Icon";
import CircularProgressBar from "@/components/core/CircularProgressBar";
import { ColorProps } from "@/components/SideTapDriverDetail/StopOverList";
import { BG_50, TEXT_650 } from "@/styles/smColor";

interface DriverDispatchDetailDashboardProps extends ColorProps {
  drivingTime: number;
  mileage: number;
  totalOrder: number;
  availabilityOrder: number;
}

const DriverDispatchDetailDashboard = ({
  drivingTime,
  mileage,
  totalOrder,
  availabilityOrder,
  bgColor,
}: DriverDispatchDetailDashboardProps) => {
  const orderTextColor = totalOrder > availabilityOrder ? "text-red-500" : TEXT_650[bgColor];

  return (
    <div className={`inline-flex h-[228px] flex-col items-center justify-start ${BG_50[bgColor]} px-8 pb-6 pt-5`}>
      <div className="flex h-[198px] flex-col items-center justify-start gap-4 rounded-lg bg-white p-5">
        <div className={`inline-flex w-[336px] items-center justify-between rounded ${BG_50[bgColor]} px-3 py-1`}>
          <div className="flex items-center justify-start gap-1 py-1.5">
            <div className="text-center text-gray-900 text-B-14-B">김기사</div>
            <div className="text-center text-gray-700 text-B-14-R">010-1234-5678</div>
          </div>
          <div className="inline-flex w-[42px] flex-col items-center justify-center">
            <Icon id="wing_3.5T" size={40}></Icon>
          </div>
        </div>
        <div className="inline-flex items-center justify-between self-stretch px-3">
          <div className="inline-flex h-[102px] w-[151px] flex-col items-start justify-start gap-2 rounded bg-white">
            <div className="inline-flex items-center justify-start gap-4 rounded">
              <div className="flex h-6 w-[68px] items-center justify-start gap-0.5 py-0.5">
                <Icon id="clock" size={14} className="text-gray-500"></Icon>
                <div className="text-justify text-gray-500 text-B-14-M">주행 시간</div>
              </div>
              <div className="flex items-center justify-start">
                <div className="inline-flex flex-col items-start justify-center">
                  <div className={`${TEXT_650[bgColor]} text-T-20-B`}>{drivingTime}</div>
                </div>
                <div className="inline-flex flex-col items-center justify-center gap-3 pb-0.5 pt-[3px]">
                  <div className="self-stretch text-justify text-gray-700 text-T-16-B">시간</div>
                </div>
              </div>
            </div>
            <div className="inline-flex items-center justify-start gap-4 rounded">
              <div className="flex h-6 w-[68px] items-center justify-start gap-0.5 py-0.5">
                <Icon id="truck" size={14} className="text-gray-500"></Icon>
                <div className="text-justify text-gray-500 text-B-14-M">주행 거리</div>
              </div>
              <div className="flex items-center justify-start">
                <div className="inline-flex flex-col items-start justify-center">
                  <div className={`${TEXT_650[bgColor]} text-T-20-B`}>{mileage}</div>
                </div>
                <div className="inline-flex flex-col items-center justify-center gap-3 pb-0.5 pt-[3px]">
                  <div className="self-stretch text-justify text-gray-700 text-T-16-B">km</div>
                </div>
              </div>
            </div>
            <div className="flex h-[38px] w-[153px] flex-col items-start justify-start rounded">
              <div className="inline-flex items-center justify-start gap-4">
                <div className="inline-flex h-[38px] w-[70px] items-start justify-start gap-1 py-0.5">
                  <div className="flex items-center justify-center gap-1 py-[3px]">
                    <Icon id="order" size={14} className="text-gray-500"></Icon>
                  </div>
                  <div className="inline-flex h-[34px] w-[52px] flex-col items-end justify-center">
                    <div className="text-right text-gray-500 text-B-14-M">전체 주문</div>
                    <div className="inline-flex items-center justify-end gap-3 self-stretch">
                      <div className="text-right leading-[14.40px] text-gray-500 text-C-12-M">/가용주문</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <div className="inline-flex flex-col items-start justify-center">
                    <div className={`${orderTextColor} text-T-20-B`}>{totalOrder}</div>
                  </div>
                  <div className="inline-flex flex-col items-center justify-center gap-3 pb-0.5 pt-[3px]">
                    <div className="self-stretch text-justify text-gray-700 text-T-16-B">/{availabilityOrder}</div>
                  </div>
                  <div className="inline-flex flex-col items-center justify-center gap-3 pb-0.5 pt-[3px]">
                    <div className="self-stretch text-justify text-gray-700 text-T-16-B">건</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[0px] w-[60px] rotate-90 border border-gray-50"></div>

          <CircularProgressBar percentage={90} bgColor={bgColor} />
        </div>
      </div>
    </div>
  );
};

export default DriverDispatchDetailDashboard;
