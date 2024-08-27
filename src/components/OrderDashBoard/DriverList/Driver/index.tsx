import Icon from "@/components/core/Icon";
import { DriverListProps } from "@/components/OrderDashBoard/DriverList";
import { IconId } from "@/components/core/Icon";

interface DriverProps extends DriverListProps {
  checkOrWarning: "check" | "warning";
  name: string;
  orderCount: number;
  kiloMeter: number;
  hours: number;
  tonCode: string;
  capacityRate: number;
}

const Driver = ({
  checkOrWarning,
  name,
  orderCount,
  kiloMeter,
  hours,
  tonCode,
  capacityRate,
  onClickToggle,
}: DriverProps) => {
  const checkOrWarningBgColor = checkOrWarning === "check" ? "bg-green-50" : "bg-red-600";
  const checkOrWarningTextColor = checkOrWarning === "check" ? "text-green-500" : "text-white";
  const dynamicIconId = tonCode as IconId;

  let capacityBgColor;
  if (capacityRate > 100) {
    capacityBgColor = "bg-red-500";
  } else if (capacityRate > 70) {
    capacityBgColor = "bg-blue-250";
  } else if (capacityRate > 30) {
    capacityBgColor = "bg-blue-400";
  } else {
    capacityBgColor = "bg-blue-500";
  }

  return (
    <div className="inline-flex h-[40px] w-[420px] items-center justify-start rounded border border-[#e6e6e6] bg-white">
      <div className="flex h-10 shrink grow basis-0 items-center justify-start gap-1 rounded py-1 pl-3">
        <div className="flex items-center justify-start gap-3 py-[5px]">
          <div className={`p-1 ${checkOrWarningBgColor} flex items-center justify-center rounded-full`}>
            <Icon id={checkOrWarning} size={14} className={checkOrWarningTextColor} />
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
              <Icon id={dynamicIconId} size={40} />
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
        <div className="flex h-10 w-3 items-center rounded-br rounded-tr bg-sky-350 px-[4px] transition-all duration-300 ease-in-out group-hover:w-[22px] group-hover:justify-center">
          <button className="flex h-full w-full items-center justify-center" onClick={onClickToggle}>
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
