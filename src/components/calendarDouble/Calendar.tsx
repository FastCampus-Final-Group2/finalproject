import React, { useState } from "react";
import dayjs from "dayjs";
import Header from "./Header";
import Month from "./Month";

interface CalendarProps {
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  onDateClick: (date: dayjs.Dayjs) => void;
}

const Calendar: React.FC<CalendarProps> = ({ startDate, endDate, onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [nextMonth, setNextMonth] = useState(dayjs().add(1, "month"));

  const prevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
    setNextMonth(nextMonth.subtract(1, "month"));
  };

  const nextMonthFunc = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
    setNextMonth(nextMonth.add(1, "month"));
  };

  return (
    <div className="flex h-80 flex-col">
      <Header currentMonth={currentMonth} nextMonth={nextMonth} prevMonth={prevMonth} nextMonthFunc={nextMonthFunc} />
      <div className="flex justify-center gap-1">
        <Month month={currentMonth} startDate={startDate} endDate={endDate} onDateClick={onDateClick} />
        <Month month={nextMonth} startDate={startDate} endDate={endDate} onDateClick={onDateClick} />
      </div>
    </div>
  );
};

export default Calendar;
