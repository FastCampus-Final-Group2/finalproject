"use client";

import Icon from "@/components/core/Icon";
import Driver from "@/components/OrderDashBoard/DriverList/Driver";
import ToggleExpandSwitch from "@/components/core/ToggleExpandSwitch";
import { BG_350 } from "@/styles/smColor";
import { useRecoilState } from "recoil";
import { dispatchDataState } from "@/atoms/dispatchData";

const DriverList = () => {
  const { isExpanded, toggleExpand } = ToggleExpandSwitch();
  const [recoilDispatchData] = useRecoilState(dispatchDataState);

  const colors: Array<keyof typeof BG_350> = [
    "lime",
    "sky",
    "purple",
    "violet",
    "redwood",
    "peanut",
    "brown",
    "forest",
    "yale",
    "olive",
  ];

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
          {recoilDispatchData?.course?.map((driver, index) => (
            <Driver
              key={index}
              index={index}
              checkOrWarning={driver.errorYn}
              name={driver.smName}
              orderCount={driver.orderNum}
              kiloMeter={driver.mileage}
              hours={driver.totalTime}
              vehicleType={driver.vehicleType}
              vehicleTon={driver.vehicleTon}
              capacityRate={driver.floorAreaRatio}
              bgColor={colors[index % colors.length]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverList;
