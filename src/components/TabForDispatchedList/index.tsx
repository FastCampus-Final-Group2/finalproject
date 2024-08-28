import TabForDispatchedListChange from "./TabForDispatchedListChange";

interface TabForDispatchedListProps {
  data: {
    inProgress: number;
    waiting: number;
    completed: number;
  };
  onStateChange: (state: string) => void;
}

const TabForDispatchedList = ({ data, onStateChange }: TabForDispatchedListProps) => {
  const drivingStates = ["주행중", "주행대기", "주행완료"];
  const numbersState = [data.inProgress, data.waiting, data.completed];

  return (
    <div className="box-border h-[48px] border-b border-gray-200">
      <TabForDispatchedListChange states={drivingStates} numbers={numbersState} onStateChange={onStateChange} />
    </div>
  );
};

export default TabForDispatchedList;
