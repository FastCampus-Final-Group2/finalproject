"use client";

import TabForListChange from "./TabForListChange";
import mockdata from "@/components/dispatchLists/mockdata.json";

const TabForList = () => {
  const drivingStates = ["주행중", "주행대기", "주행완료"];
  // const drivingStates = ["전체", "완료", "오류"];
  const drivingStatesNumber = [10, 4, 12];

  const handleStateChange = (newState: string) => {
    console.log("Selected state:", newState);
  };

  return <TabForListChange states={drivingStates} numbers={drivingStatesNumber} onStateChange={handleStateChange} />;
};

export default TabForList;
