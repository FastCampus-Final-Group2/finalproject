'use client';

import { useState } from 'react';
import Icon from "@/components/core/Icon";
import Driver from '@/components/OrderDashBoard/DriverList/Driver';

const DriverList = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-[460px] border rounded-[8px] p-[20px] gap-[16px] bg-white">
      <div className="flex justify-between mb-2">
        <div className="font-B">기사 (10)</div>
        <button
          onClick={toggleExpand}
          className="text-blue-600 font-semibold"
        >
          {isExpanded ? <Icon id='arrowUp'size={24} /> : <Icon id='arrowDown'size={24} />}
        </button>
      </div>
      {isExpanded && (
        <div className="max-h-[264px] flex flex-col gap-2 overflow-y-auto scrollbar-hide">
          <Driver checkOrWarning={"check"} name={"김기사"} orderCount={130} kiloMeter={340} hours={8} tonCode={"top_1.2T"} capacityRate={90} />
          <Driver checkOrWarning={"check"} name={"김기사"} orderCount={130} kiloMeter={340} hours={8} tonCode={"top"} capacityRate={31} />
          <Driver checkOrWarning={"check"} name={"김기사"} orderCount={130} kiloMeter={340} hours={8} tonCode={"wing_3.5T"} capacityRate={50} />
          <Driver checkOrWarning={"check"} name={"김기사"} orderCount={130} kiloMeter={340} hours={8} tonCode={"cargo_5T"} capacityRate={190} />
          <Driver checkOrWarning={"warning"} name={"김기사"} orderCount={13} kiloMeter={340} hours={10} tonCode={"cargo_1.2T"} capacityRate={0} />
          <Driver checkOrWarning={"check"} name={"김기사"} orderCount={1} kiloMeter={340} hours={8} tonCode={"wing_3.5T"} capacityRate={10} />
          <Driver checkOrWarning={"warning"} name={"김기사"} orderCount={13} kiloMeter={30} hours={8} tonCode={"wing_8T"} capacityRate={90} />
        </div>
      )}
    </div>
  );
};

export default DriverList;