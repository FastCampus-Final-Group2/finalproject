import React from "react";
import dayjs from "dayjs";
import Icon from "@/components/core/Icon";

interface HeaderProps {
  currentMonth: dayjs.Dayjs;
  nextMonth: dayjs.Dayjs;
  maxMonth?: dayjs.Dayjs;
  prevMonth: () => void;
  nextMonthFunc: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentMonth, nextMonth, maxMonth, prevMonth, nextMonthFunc }) => {
  const isNextMonthDisabled = nextMonth.isAfter(maxMonth, "month");
  const isPrevMonthDisabled = currentMonth.isSame(dayjs(), "month");

  return (
    <div className="text-lg relative mb-5 flex w-full flex-row items-center">
      <button onClick={prevMonth} disabled={isPrevMonthDisabled}>
        <Icon id="arrowLeft" size={16} />
      </button>
      <p className="font-bold mx-auto flex justify-between">
        {currentMonth.format("YYYY년 M월")}
        <span className="px-1">~</span>
        {nextMonth.format("YYYY년 M월")}
      </p>
      <button onClick={nextMonthFunc} disabled={isNextMonthDisabled}>
        <Icon id="arrowRight" size={16} />
      </button>
    </div>
  );
};

export default Header;
