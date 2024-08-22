"use client";

import { useState } from "react";
import { tabClass, numberClass } from "./index.varients";
import { cn } from "@/utils/cn";

interface TabForListProps {
  states?: string[];
  numbers?: number[];
  initialSelectedState?: string;
  onStateChange?: (state: string) => void;
}

const TabForListChange = ({
  states = [],
  numbers = [],
  initialSelectedState,
  onStateChange = () => {},
}: TabForListProps) => {
  const [selectedState, setSelectedState] = useState(initialSelectedState ?? states[0]);

  const handleStateClick = (state: string) => {
    setSelectedState(state);
    onStateChange(state);
  };

  return (
    <div className="flex h-[48px] text-T-18-B">
      {states.map((state, index) => {
        const isSelected = selectedState === state;
        const isError = state === "오류";
        const isCompleteOrAll = ["전체", "완료"].includes(state);

        return (
          <div
            key={state}
            className={cn(tabClass({ isSelected, isCompleteOrAll, isError }))}
            onClick={() => handleStateClick(state)}
            role="tab"
            aria-selected={isSelected}
          >
            <span>{state}</span>
            <span className={cn(numberClass({ isError, isCompleteOrAll, isSelected }))}>{numbers[index]}</span>
            {isSelected && <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-blue-500"></div>}
          </div>
        );
      })}
    </div>
  );
};

export default TabForListChange;
