"use client";

import Icon from "@/components/core/Icon";
import Driver from "@/components/OrderDashBoard/DriverList/Driver";
import ToggleExpandSwitch from "@/components/core/ToggleExpandSwitch";

export interface DriverListProps {
  onClickToggle: () => void;
}

const DriverList = ({ onClickToggle }: DriverListProps) => {
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
          <Driver
            checkOrWarning={"check"}
            name={"김기사"}
            orderCount={130}
            kiloMeter={340}
            hours={8}
            tonCode={"top_1.2T"}
            capacityRate={90}
            onClickToggle={onClickToggle}
          />
          <Driver
            checkOrWarning={"check"}
            name={"김기사"}
            orderCount={130}
            kiloMeter={340}
            hours={8}
            tonCode={"top"}
            capacityRate={31}
            onClickToggle={onClickToggle}
          />
          <Driver
            checkOrWarning={"check"}
            name={"김기사"}
            orderCount={130}
            kiloMeter={340}
            hours={8}
            tonCode={"wing_3.5T"}
            capacityRate={50}
            onClickToggle={onClickToggle}
          />
          <Driver
            checkOrWarning={"check"}
            name={"김기사"}
            orderCount={130}
            kiloMeter={340}
            hours={8}
            tonCode={"cargo_5T"}
            capacityRate={190}
            onClickToggle={onClickToggle}
          />
          <Driver
            checkOrWarning={"warning"}
            name={"김기사"}
            orderCount={13}
            kiloMeter={340}
            hours={10}
            tonCode={"cargo_1.2T"}
            capacityRate={0}
            onClickToggle={onClickToggle}
          />
          <Driver
            checkOrWarning={"check"}
            name={"김기사"}
            orderCount={1}
            kiloMeter={340}
            hours={8}
            tonCode={"wing_3.5T"}
            capacityRate={10}
            onClickToggle={onClickToggle}
          />
          <Driver
            checkOrWarning={"warning"}
            name={"김기사"}
            orderCount={13}
            kiloMeter={30}
            hours={8}
            tonCode={"wing_8T"}
            capacityRate={90}
            onClickToggle={onClickToggle}
          />
        </div>
      )}
    </div>
  );
};

export default DriverList;
