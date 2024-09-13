import TabForDispatchedListChange from "./TabForDispatchedListChange";
import { useRecoilState, useSetRecoilState } from "recoil";
import { controlTabState, controlPageState } from "@/atoms/control";

interface TabForDispatchedListProps {
  data: {
    inProgress: number;
    waiting: number;
    completed: number;
  };
  onStateChange: (state: "IN_TRANSIT" | "WAITING" | "COMPLETED") => void;
  initialState: "IN_TRANSIT" | "WAITING" | "COMPLETED";
}

const TabForDispatchedList = ({ data, onStateChange, initialState }: TabForDispatchedListProps) => {
  const drivingStates = ["주행중", "주행대기", "주행완료"];
  const numbersState = [data.inProgress, data.waiting, data.completed];
  const [selectedState, setSelectedState] = useRecoilState(controlTabState);
  const setCurrentPage = useSetRecoilState(controlPageState);
  const stateMapping = {
    주행중: "IN_TRANSIT",
    주행대기: "WAITING",
    주행완료: "COMPLETED",
  };
  const handleStateChange = (state: keyof typeof stateMapping) => {
    setSelectedState(state);
    onStateChange(stateMapping[state] as "IN_TRANSIT" | "WAITING" | "COMPLETED");
    setCurrentPage(1);
  };

  return (
    <div className="box-border h-[48px] border-b border-gray-200">
      <TabForDispatchedListChange
        states={drivingStates}
        numbers={numbersState}
        onStateChange={handleStateChange as (state: string) => void}
        selectedState={selectedState}
      />
    </div>
  );
};

export default TabForDispatchedList;
