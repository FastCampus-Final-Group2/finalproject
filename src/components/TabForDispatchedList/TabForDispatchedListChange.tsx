import { useState, useEffect } from "react";
import { tabClass, numberClass } from "./index.variants";
import { cn } from "@/utils/cn";

interface TabForDispatchedListChangeProps {
  states?: string[];
  numbers?: number[];
  initialSelectedState?: string;
  onStateChange?: (state: string) => void;
}

const TabForDispatchedListChange = ({
  states = [],
  numbers = [],
  initialSelectedState,
  onStateChange = () => {},
}: TabForDispatchedListChangeProps) => {
  const [selectedState, setSelectedState] = useState(initialSelectedState ?? states[0]);

  const handleStateClick = (state: string) => {
    setSelectedState(state);
    onStateChange(state);
  };

  useEffect(() => {
    console.log(`Selected state: ${selectedState}`);
  }, [selectedState]);

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
