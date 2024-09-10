import { useState } from "react";
import TabForDispatchedListChange from "./TabForDispatchedListChange";

interface TabForDispatchedListProps {
  data: {
    inProgress: number;
    waiting: number;
    completed: number;
  };
  onStateChange: (state: string) => void;
  initialState: string;
}

const TabForDispatchedList = ({ data, onStateChange, initialState }: TabForDispatchedListProps) => {
  const drivingStates = ["주행중", "주행대기", "주행완료"];
  const numbersState = [data.inProgress, data.waiting, data.completed];
  const stateMapping = {
    주행중: "IN_TRANSIT",
    주행대기: "WAITING",
    주행완료: "COMPLETED",
  };
  const reverseStateMapping = {
    IN_TRANSIT: "주행중",
    WAITING: "주행대기",
    COMPLETED: "주행완료",
  };

  const [selectedState, setSelectedState] = useState(
    reverseStateMapping[initialState as keyof typeof reverseStateMapping],
  );

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    onStateChange(stateMapping[state as keyof typeof stateMapping]);
  };

  return (
    <div className="box-border h-[48px] border-b border-gray-200">
      <TabForDispatchedListChange
        states={drivingStates}
        numbers={numbersState}
        onStateChange={handleStateChange}
        selectedState={selectedState}
      />
    </div>
  );
};

export default TabForDispatchedList;
