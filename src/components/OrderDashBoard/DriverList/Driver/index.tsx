import Icon from "@/components/core/Icon";
import { IconId } from "@/components/core/Icon";
import { BG_350 } from "@/styles/smColor";
import { useSetRecoilState } from "recoil";
import { bgColorState } from "@/atoms/bgColorState";
import { selectedDriverState } from "@/atoms/dispatchData";

interface DriverProps {
  index: number;
  checkOrWarning?: boolean;
  name?: string;
  orderCount?: number;
  kiloMeter?: number;
  hours?: number;
  vehicleType?: string;
  capacityRate?: number;
  vehicleTon?: number;
  bgColor: keyof typeof BG_350;
}

const Driver = ({
  index,
  checkOrWarning,
  name,
  orderCount,
  kiloMeter,
  hours,
  vehicleType = "",
  vehicleTon = 0,
  capacityRate = 0,
  bgColor,
}: DriverProps) => {
  const checkOrWarningBgColor = checkOrWarning ? "bg-green-50" : "bg-red-600";
  const checkOrWarningTextColor = checkOrWarning ? "text-green-500" : "text-white";
  const checkOrWarningId = checkOrWarning ? "check" : "warning";

  const dynamicIconId = (vehicleType: string, vehicleTon: number): IconId => {
    let prefix = "";

    switch (vehicleType) {
      case "WING_BODY":
        prefix = "wing_";
        break;
      case "BOX":
        prefix = "top_";
        break;
      case "CARGO":
        prefix = "cargo_";
        break;
      default:
        prefix = "";
    }

    return `${prefix}${vehicleTon}T` as IconId;
  };

  const setBgColor = useSetRecoilState(bgColorState);
  const setSelectedDriver = useSetRecoilState(selectedDriverState);

  const handleButtonClick = () => {
    setBgColor(bgColor); // 버튼 클릭 시 bgColor를 전역 상태로 설정
    setSelectedDriver(index);
  };

  let capacityBgColor;
  if (capacityRate > 100) {
    capacityBgColor = "bg-red-500";
  } else if (capacityRate > 70) {
    capacityBgColor = "bg-blue-250";
  } else if (capacityRate > 30) {
    capacityBgColor = "bg-blue-400";
  } else if (capacityRate === 0) {
    capacityBgColor = "bg-gray-600";
  } else {
    capacityBgColor = "bg-blue-500";
  }

  return (
    <div className="inline-flex h-[40px] w-[420px] items-center justify-start rounded border border-[#e6e6e6] bg-white">
      <div className="flex h-10 shrink grow basis-0 items-center justify-start gap-1 rounded py-1 pl-3">
        <div className="flex items-center justify-start gap-3 py-[5px]">
          <div className={`p-1 ${checkOrWarningBgColor} flex items-center justify-center rounded-full`}>
            <Icon id={checkOrWarningId} size={14} className={checkOrWarningTextColor} />
          </div>
        </div>
        <div className="flex h-[32px] w-[320px] items-center justify-start gap-2">
          <div className="flex w-[37px] items-center justify-center gap-[9px] py-1.5">
            <div className="leading-tight text-B-14-B">{name}</div>
          </div>
          <div className="h-[20px] w-[0px] border border-gray-100"></div>
          <div className="flex h-8 w-[140px] items-center justify-center py-1.5 text-B-14-R">
            <div className="max-w-6 text-right">{orderCount}</div>
            <div className="text-center">건</div>
            <div>・</div>
            <div className="max-w-7 text-right">{kiloMeter}</div>
            <div className="text-center">km</div>
            <div>・</div>
            <div className="max-w-7 text-right">{hours}</div>
            <div className="text-center">시간</div>
          </div>
          <div className="h-[20px] w-[0px] border border-gray-100"></div>
          <div className="flex items-center justify-end gap-2">
            <div className="inline-flex w-[42px] flex-col items-center justify-center">
              <Icon id={dynamicIconId(vehicleType, vehicleTon)} size={40} />
            </div>
            <div className="inline-flex w-[46px] flex-col items-center justify-center">
              <div
                className={`self-stretch px-2 py-1 ${capacityBgColor} inline-flex items-center justify-center gap-1 rounded`}
              >
                <div className="text-center text-white text-B-14-M">{capacityRate}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="group relative">
        <div
          className={`flex h-10 w-3 items-center rounded-br rounded-tr ${BG_350[bgColor]} px-[4px] transition-all duration-300 ease-in-out group-hover:w-[22px] group-hover:justify-center`}
        >
          <button className="flex h-full w-full items-center justify-center" onClick={handleButtonClick}>
            <Icon
              id="arrowLargeDoubleRight"
              size={14}
              className="text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Driver;
