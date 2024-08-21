import React from "react";
import dayjs from "dayjs";
import DaysRow from "./DaysRow";
import Cell from "./Cell";

interface MonthProps {
  month: dayjs.Dayjs;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  onDateClick: (date: dayjs.Dayjs) => void;
}

const Month: React.FC<MonthProps> = ({ month, startDate, endDate, onDateClick }) => {
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
        const isEndDate = endDate ? day.isSame(endDate, "day") : false;
        const isCurrentMonth = day.isSame(month, "month");
        const isInRange = startDate && endDate ? day.isAfter(startDate, "day") && day.isBefore(endDate, "day") : false;

        days.push(
          <Cell
            key={day.toString()}
            isDisabled={!isCurrentMonth}
            isStartDate={isStartDate}
            isEndDate={isEndDate}
            isToday={day.isSame(dayjs(), "day")}
            isPast={isPast}
            isCurrentMonth={isCurrentMonth}
            isInRange={isInRange}
            onClick={() => onDateClick(cloneDay)}
          >
            {formattedDate}
          </Cell>,
        );
        day = day.add(1, "day");
      }
      rows.push(
        <div className="flex flex-row items-center justify-between" key={day.toString()}>
          {days}
        </div>,
      );
      days = [];
    }
    return rows;
  };

  return (
    <div className="flex w-full flex-col p-2">
      <DaysRow />
      {renderCells(month)}
    </div>
  );
};

export default Month;
