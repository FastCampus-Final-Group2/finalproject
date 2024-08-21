import React from "react";

const DaysRow: React.FC = () => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="mb-1 flex items-center justify-between border-b border-gray-300 px-2 pb-1">
      {days.map((day) => (
        <div key={day} className="text-lg flex items-center justify-center">
          {day}
        </div>
      ))}
    </div>
  );
};

export default DaysRow;
