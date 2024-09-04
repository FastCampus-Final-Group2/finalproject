import Icon from "@/components/core/Icon";
import ToggleExpandSwitch from "@/components/core/ToggleExpandSwitch";
import EachDriver from "./EachDriver";

type ColorType = "lime" | "sky" | "violet" | "redwood" | "peanut" | "brown" | "forest" | "yale" | "olive";

export interface DispatchedDriversProps {
  onClickToggle: (color: ColorType) => void; // ColorType으로 변경
  smColors: ColorType[];
  drivers: Array<{
    smNumber: number;
    smName: string;
    totalOrders: number;
    completed: number;
    deliveryProgress: number;
    dispatchDetailStatus:
      | "DELIVERY_DELAY"
      | "WORK_COMPLETED"
      | "CANCELED"
      | "WORK_WAITING"
      | "WORK_START"
      | "MOVING"
      | "RESTING"
      | "RESTING_TIME"
      | "default";
  }>;
}

const DispatchedDrivers = ({ onClickToggle, smColors, drivers }: DispatchedDriversProps) => {
  const { isExpanded, toggleExpand } = ToggleExpandSwitch();

  return (
    <div className="w-[460px] gap-[16px] rounded-[8px] bg-white p-[20px]">
      <div className="mb-2 flex justify-between">
        <div className="text-T-18-B">기사 (10)</div>
        <button onClick={toggleExpand}>
          {isExpanded ? <Icon id="arrowUp" size={24} /> : <Icon id="arrowDown" size={24} />}
        </button>
      </div>
      {isExpanded && (
        <div className="flex max-h-[264px] flex-col gap-2 overflow-y-auto scrollbar-hide">
          {drivers.map((driver, index) => (
            <EachDriver
              key={driver.smNumber}
              smNumber={driver.smNumber} // 추가
              // statusText={...}
              name={driver.smName}
              totalOrder={driver.totalOrders}
              completed={driver.completed}
              deliveryProgress={driver.deliveryProgress}
              onClickToggle={() => onClickToggle(smColors[index % smColors.length])}
              smColor={smColors[index % smColors.length]}
              dispatchDetailStatus={driver.dispatchDetailStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DispatchedDrivers;
