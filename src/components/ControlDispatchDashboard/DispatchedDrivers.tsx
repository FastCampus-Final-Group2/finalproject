import Icon from "@/components/core/Icon";
import ToggleExpandSwitch from "@/components/core/ToggleExpandSwitch";
import EachDriver from "./EachDriver";
import { DispatchSimpleResponse } from "@/models/ApiTypes";

type ColorType = "lime" | "sky" | "violet" | "redwood" | "peanut" | "brown" | "forest" | "yale" | "olive";
type VehicleStatusType =
  | "DELIVERY_DELAY"
  | "WORK_COMPLETED"
  | "CANCELED"
  | "WORK_WAITING"
  | "WORK_START"
  | "MOVING"
  | "RESTING"
  | "RESTING_TIME"
  | "default";
export interface DispatchedDriversProps {
  onClickToggle: (color: ColorType, dispatchId: number) => void; // ColorType으로 변경
  smColors: ColorType[];
  drivers: DispatchSimpleResponse[];
  dispatchStatus: VehicleStatusType[];
}

const DispatchedDrivers = ({ onClickToggle, smColors, drivers, dispatchStatus }: DispatchedDriversProps) => {
  const { isExpanded, toggleExpand } = ToggleExpandSwitch();

  return (
    <div className="w-[460px] gap-[16px] rounded-[8px] bg-white p-[20px]">
      <div className="mb-2 flex justify-between">
        <div className="text-T-18-B">기사 ({drivers.length})</div>
        <button onClick={toggleExpand}>
          {isExpanded ? <Icon id="arrowUp" size={24} /> : <Icon id="arrowDown" size={24} />}
        </button>
      </div>
      {isExpanded && (
        <div className="flex max-h-[264px] flex-col gap-2 overflow-y-auto scrollbar-hide">
          {drivers.map((driver, index) => (
            <EachDriver
              key={driver.dispatchId}
              dispatchId={driver.dispatchId ?? 0}
              dispatchStatus={(driver.dispatchStatus as VehicleStatusType) ?? "default"}
              smName={driver.smName ?? ""}
              orderNum={driver.orderNum ?? 0}
              completedOrderNum={driver.completedOrderNum ?? 0}
              deliveryProgress={driver.progressionRate ?? 0}
              onClickToggle={() => onClickToggle(smColors[index % smColors.length], driver.dispatchId ?? 0)}
              smColor={smColors[index % smColors.length]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DispatchedDrivers;
