import TabForDispatchedListChange from "./TabForDispatchedListChange";

interface TabForDispatchedListProps {
  data: {
    IN_TRANSIT: number;
    WAITING: number;
    COMPLETED: number;
  };
  onStateChange: (state: string) => void;
}

const TabForDispatchedList = ({ data, onStateChange }: TabForDispatchedListProps) => {
  const drivingStates = ["주행중", "주행대기", "주행완료"];
  const numbersState = [data.IN_TRANSIT, data.WAITING, data.COMPLETED];

  return (
    <div className="box-border h-[48px] border-b border-gray-200">
      <TabForDispatchedListChange states={drivingStates} numbers={numbersState} onStateChange={onStateChange} />
    </div>
  );
};

export default TabForDispatchedList;
