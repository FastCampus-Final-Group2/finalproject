import React from "react";

interface CellProps {
  isStartDate: boolean;
  isToday: boolean;
  isPast: boolean;
  isCurrentMonth: boolean;
  onClick: () => void;
  children: React.ReactNode;
  isSunday: boolean;
  disabled: boolean;
}

const Cell = ({ isStartDate, isToday, isPast, isCurrentMonth, onClick, children, isSunday, disabled }: CellProps) => {
  if (!isCurrentMonth) {
    return <div className="flex-1" />;
  }
  return (
    <div
      role="button"
      onClick={disabled ? undefined : onClick}
      className={`flex-2 flex h-[26px] w-[26px] items-center justify-center rounded-full text-B-14-M ${
        disabled ? "cursor-not-allowed text-gray-300" : "cursor-pointer hover:border-blue-500"
      } ${
        isStartDate
          ? "rounded-full bg-blue-500 text-white text-B-14-B"
          : isPast && !disabled
            ? "text-gray-400"
            : isToday
              ? "border border-blue-250 text-B-14-B"
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
