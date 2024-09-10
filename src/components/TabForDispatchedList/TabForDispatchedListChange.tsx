import { tabClass, numberClass } from "./index.variants";
import { cn } from "@/utils/cn";

interface TabForDispatchedListChangeProps {
  states: string[];
  numbers: number[];
  selectedState: string;
  onStateChange: (state: string) => void;
}

const TabForDispatchedListChange = ({
  states,
  numbers,
  selectedState,
  onStateChange,
}: TabForDispatchedListChangeProps) => {
  const handleStateClick = (state: string) => {
    onStateChange(state);
  };

  return (
    <div className="flex h-[48px] text-T-18-B">
      {states.map((state, index) => {
        const isSelected = selectedState === state;

        return (
          <div
            key={state}
            className={cn(tabClass({ isSelected }))}
            onClick={() => handleStateClick(state)}
            role="tab"
            aria-selected={isSelected}
          >
            <span>{state}</span>
            <span className={cn(numberClass({ isSelected }))}>{numbers[index]}</span>
            {isSelected && <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-blue-500"></div>}
          </div>
        );
      })}
    </div>
  );
};

export default TabForDispatchedListChange;
