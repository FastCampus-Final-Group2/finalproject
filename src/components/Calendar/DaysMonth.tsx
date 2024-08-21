import React from "react";
import dayjs from "dayjs";
import DaysRow from "./DaysRow";
import Cell from "./DaysCell";

interface MonthProps {
  month: dayjs.Dayjs;
  startDate: dayjs.Dayjs | null;
  onDateClick: (date: dayjs.Dayjs) => void;
}

const Month: React.FC<MonthProps> = ({ month, startDate, onDateClick }) => {
  const renderCells = (month: dayjs.Dayjs) => {
    const monthStart = month.startOf("month");
    const monthEnd = month.endOf("month");
    const startDateOfMonth = monthStart.startOf("week");
    const endDateOfMonth = monthEnd.endOf("week");

    const rows: JSX.Element[] = [];
    let days: JSX.Element[] = [];
    let day = startDateOfMonth;

    while (day.isBefore(endDateOfMonth, "day")) {
      for (let i = 0; i < 7; i += 1) {
        const formattedDate = day.format("D");
        const cloneDay = day;
        const isPast = day.isBefore(dayjs(), "day");
        const isStartDate = startDate ? day.isSame(startDate, "day") : false;
        const isCurrentMonth = day.isSame(month, "month");

        days.push(
          <Cell
            key={day.toString()}
            isStartDate={isStartDate}
            isToday={day.isSame(dayjs(), "day")}
            isPast={isPast}
            isCurrentMonth={isCurrentMonth}
            onClick={() => onDateClick(cloneDay)}
          >
            <span>{formattedDate}</span>
          </Cell>,
        );
        day = day.add(1, "day");
      }
      rows.push(
        <div className="flex w-full" key={day.toString()}>
          {days}
        </div>,
      );
      days = [];
    }
    return <div className="flex w-full flex-col">{rows}</div>;
  };

  return (
    <div className="relative flex flex-col">
      <DaysRow />
      {renderCells(month)}
    </div>
  );
};

export default Month;
