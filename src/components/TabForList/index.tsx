import TabForListChange from "./TabForListChange";

interface TabForListProps {
  data: {
    inProgress: number;
    waiting: number;
    completed: number;
  };
  onStateChange: (state: string) => void;
}

const TabForList = ({ data, onStateChange }: TabForListProps) => {
  const drivingStates = ["주행중", "주행대기", "주행완료"];
  const numbersState = [data.inProgress, data.waiting, data.completed];

  return (
    <div className="box-border h-[48px] border-b border-gray-200">
      <TabForListChange states={drivingStates} numbers={numbersState} onStateChange={onStateChange} />
    </div>
  );
};

export default TabForList;
