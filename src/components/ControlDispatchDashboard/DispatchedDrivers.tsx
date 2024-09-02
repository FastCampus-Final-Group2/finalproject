import Icon from "@/components/core/Icon";
import ToggleExpandSwitch from "@/components/core/ToggleExpandSwitch";
import EachDriver from "./EachDriver";

export interface DispatchedDriversProps {
  onClickToggle: (color: string) => void;
  smColors: string[];
  drivers: Array<{
    statusText: string;
    smName: string;
    totalOrders: number;
    completed: number;
    deliveryProgress: number;
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
              key={index}
              name={driver.smName}
              totalOrder={driver.totalOrders}
              completed={driver.completed}
              deliveryProgress={driver.deliveryProgress}
              onClickToggle={() => onClickToggle(smColors[index % smColors.length])}
              smColor={smColors[index % smColors.length]}
              statusText={driver.statusText}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DispatchedDrivers;
