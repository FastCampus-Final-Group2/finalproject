import React from "react";
import dayjs from "dayjs";

interface HeaderProps {
  currentMonth: dayjs.Dayjs;
  nextMonth: dayjs.Dayjs;
  prevMonth: () => void;
  nextMonthFunc: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentMonth, prevMonth, nextMonthFunc }) => {
  return (
    <div className="text-lg relative mb-5 flex items-center">
      <button onClick={prevMonth} className="absolute left-0 text-gray-500">
        &lt;
      </button>
      <p className="font-bold mx-auto">{currentMonth.format("YYYY년 M월")}</p>
      <button onClick={nextMonthFunc} className="absolute right-0 text-gray-500">
        &gt;
      </button>
    </div>
  );
};

export default Header;
