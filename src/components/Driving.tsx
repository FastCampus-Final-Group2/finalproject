"use client";

import TabForList from "./TabForList";

const Driving = () => {
  const drivingStates = ["주행중", "주행대기", "주행완료"];
  // const drivingStates = ["전체", "완료", "오류"];
  const drivingStatesNumber = [10, 4, 12];

  const handleStateChange = (newState: string) => {
    console.log("Selected state:", newState);
  };

  return <TabForList states={drivingStates} numbers={drivingStatesNumber} onStateChange={handleStateChange} />;
};

export default Driving;
