import React, { ReactNode } from "react";

interface CellProps {
  isStartDate: boolean;
  isEndDate: boolean;
  isInRange: boolean;
  isPast: boolean;
  isToday: boolean;
  isDisabled: boolean;
  isCurrentMonth: boolean;
  onClick: () => void;
  children: ReactNode;
}

const Cell: React.FC<CellProps> = ({
  isStartDate,
  isEndDate,
  isInRange,
  isPast,
  isToday,
  isDisabled,
  isCurrentMonth,
  onClick,
  children,
}) => {
  const getClasses = () => {
    let baseClasses = "flex justify-center items-center w-[30px] h-[30px] rounded-full cursor-pointer";

    if (isPast || isDisabled) {
      baseClasses += " cursor-not-allowed text-gray-200";
    } else {
      if (isStartDate || isEndDate) {
        baseClasses += " bg-blue-500 text-white text-B-14-B";
      } else if (isInRange) {
        baseClasses += " bg-blue-100 rounded-none text-black";
      } else if (isToday) {
        baseClasses += " border border-blue-500";
      } else {
        baseClasses += " text-black";
      }
    }

    if (!isCurrentMonth) {
      baseClasses += " text-gray-400";
    }

    return baseClasses;
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className={getClasses()} onClick={onClick}>
        {children}
      </div>
    </div>
  );
};

export default Cell;
