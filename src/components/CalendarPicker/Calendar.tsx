import { useState } from "react";
import dayjs from "dayjs";
import Header from "./Header";
import Month from "./DaysMonth";

interface CalendarProps {
  startDate: dayjs.Dayjs | null;
  onDateClick: (date: dayjs.Dayjs) => void;
}

const Calendar = ({ startDate, onDateClick }: CalendarProps) => {
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
    <div className="flex flex-col border-r border-gray-100">
      <Header currentMonth={currentMonth} nextMonth={nextMonth} prevMonth={prevMonth} nextMonthFunc={nextMonthFunc} />
      <div className="flex justify-center gap-3">
        <Month month={currentMonth} startDate={startDate} onDateClick={onDateClick} />
      </div>
    </div>
  );
};

export default Calendar;
