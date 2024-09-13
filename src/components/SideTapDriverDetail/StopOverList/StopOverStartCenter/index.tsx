import Icon from "@/components/core/Icon";
import { ColorProps } from "@/components/SideTapDriverDetail/StopOverList";
import { useRecoilValue } from "recoil";
import { transportOrderState } from "@/atoms/transportOrder";

interface StopOverStartCenterProps extends ColorProps {
  ett: number;
  distance: number;
}

const StopOverStartCenter = ({ bgColor, ett, distance }: StopOverStartCenterProps) => {
  const dispatchData = useRecoilValue(transportOrderState);

  return (
    <div className="inline-flex h-[52px] items-start justify-start gap-5">
      <div className="inline-flex w-6 flex-col items-center justify-start gap-3 self-stretch pt-3">
        <div className="inline-flex h-6 w-6 items-center justify-center rounded-[270px] border-2 border-gray-900 bg-white p-1">
          <Icon id="flagOutlined" />
        </div>
        <div className="shrink grow basis-0 border-2 border-dashed"></div>
      </div>
      <div className="inline-flex w-[332px] flex-col items-start justify-start">
        <div className="flex h-[51px] w-full flex-col items-start justify-start gap-3 rounded-lg bg-white p-4">
          <div className="flex h-[19px] flex-col items-start justify-start gap-1 self-stretch">
            <div className="inline-flex items-center justify-start gap-2 self-stretch">
              <button className="text-center text-blue-500 text-T-16-M">
                {dispatchData.startStopoverResponse.centerName}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StopOverStartCenter;
