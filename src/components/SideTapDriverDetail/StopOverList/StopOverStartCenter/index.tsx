import Icon from "@/components/core/Icon";
import { BG_50 } from "@/styles/smColor";
import { ColorProps } from "@/components/SideTapDriverDetail/StopOverList";

const StopOverStartCenter = ({ bgColor }: ColorProps) => {
  return (
    <div className="inline-flex h-[103px] items-start justify-start gap-5">
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
              <button className="text-center text-blue-500 text-T-16-M">마포센터 </button>
            </div>
          </div>
        </div>
        <div
          className={`inline-flex h-[52px] items-center justify-start gap-[8px] self-stretch ${BG_50[bgColor]} px-[8px] py-[16px]`}
        >
          <div className="flex items-center justify-start">
            <div className="text-center text-gray-700 text-B-14-R">12.5</div>
            <div className="text-center text-gray-700 text-B-14-R">km</div>
          </div>
          <div className="h-[0px] w-[12px] rotate-90 border border-gray-200"></div>
          <div className="flex items-center justify-start">
            <div className="text-center text-gray-900 text-B-14-M">48</div>
            <div className="text-center">
              <span className="text-gray-900 text-B-14-R">분 </span>
              <span className="text-gray-700 text-B-14-R">소요예상</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StopOverStartCenter;
