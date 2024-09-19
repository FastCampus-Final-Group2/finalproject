import dayjs from "dayjs";
import DaysRow from "./DaysRow";
import Cell from "./DaysCell";

interface MonthProps {
  month: dayjs.Dayjs;
  startDate: dayjs.Dayjs | null;
  onDateClick: (date: dayjs.Dayjs) => void;
  pastDisabled: boolean;
}

const Month = ({ month, startDate, onDateClick, pastDisabled }: MonthProps) => {
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
        const isToday = day.isSame(dayjs(), "day");
        const isStartDate = startDate ? day.isSame(startDate, "day") : false;
        const isCurrentMonth = day.isSame(month, "month");
        const isSunday = day.day() === 0;

        // const textColorClass = isPast ? "text-gray-400" : isSunday ? "text-red-500" : "";

        days.push(
          <Cell
            key={day.toString()}
            isStartDate={isStartDate}
            isToday={isToday}
            isPast={isPast}
            isCurrentMonth={isCurrentMonth}
            onClick={() => (!pastDisabled || !isPast ? onDateClick(cloneDay) : undefined)}
            isSunday={isSunday}
            disabled={pastDisabled && isPast}
          >
            {formattedDate}
          </Cell>,
        );
        day = day.add(1, "day");
      }
      rows.push(
        <div className="flex gap-[4px]" key={day.toString()}>
          {days}
        </div>,
      );
      days = [];
    }
    return <div className="flex flex-col gap-[4px]">{rows}</div>;
  };

  return (
    <div className="relative flex flex-col px-[15px] py-[10px]">
      <DaysRow />
      {renderCells(month)}
    </div>
  );
};

export default Month;
