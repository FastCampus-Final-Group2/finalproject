import React from "react";

interface CellProps {
  isStartDate: boolean;
  isToday: boolean;
  isPast: boolean;
  isCurrentMonth: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Cell = ({ isStartDate, isToday, isPast, isCurrentMonth, onClick, children }: CellProps) => {
  if (!isCurrentMonth) {
    return <div className="flex-1" />;
  }

  return (
    <div
      role="button"
      onClick={onClick}
      className={`flex h-8 flex-1 cursor-pointer items-center justify-center text-B-14-M ${isPast ? "!text-gray-400" : ""} ${isToday ? "text-B-14-B" : ""} ${isStartDate ? "font-bold rounded-full bg-blue-500 text-white" : ""} hover:border-blue-500`}
    >
      {children}
    </div>
  );
};

export default Cell;
