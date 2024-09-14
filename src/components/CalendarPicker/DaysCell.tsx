import React from "react";

interface CellProps {
  isStartDate: boolean;
  isToday: boolean;
  isPast: boolean;
  isCurrentMonth: boolean;
  onClick: () => void;
  children: React.ReactNode;
  isSunday: boolean;
}

const Cell = ({ isStartDate, isToday, isPast, isCurrentMonth, onClick, children, isSunday }: CellProps) => {
  if (!isCurrentMonth) {
    return <div className="flex-1" />;
  }
  return (
    <div
      role="button"
      onClick={onClick}
      className={`flex h-[26px] w-[26px] flex-1 cursor-pointer items-center justify-center text-B-14-M hover:border-blue-500 ${
        isStartDate
          ? "rounded-full bg-blue-500 text-white text-B-14-B"
          : isPast
            ? "text-gray-400"
            : isToday
              ? "rounded-full border border-blue-250 text-B-14-B"
              : isSunday
                ? "text-red-500"
                : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Cell;
