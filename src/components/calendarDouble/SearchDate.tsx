"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import Calendar from "./Calendar";

interface SearchDateProps {
  onSelectDates: (start: string, end: string) => void;
}

const SearchDate: React.FC<SearchDateProps> = ({ onSelectDates }) => {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);

  const handleDateClick = (date: dayjs.Dayjs) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate && (date.isSame(startDate, "day") || date.isAfter(startDate))) {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const handleConfirmClick = () => {
    onSelectDates(startDate ? startDate.format("YYYY-MM-DD") : "", endDate ? endDate.format("YYYY-MM-DD") : "");
  };

  return (
    <div className="relative z-50 mx-auto flex w-fit flex-col items-center rounded-lg bg-white p-[12px] shadow-lg text-B-14-M">
      <Calendar startDate={startDate} endDate={endDate} onDateClick={handleDateClick} />
      <Calendar startDate={startDate} onDateClick={handleDateClick} useSingleCalendar={true} />

      <button>확인</button>
    </div>
  );
};

export default SearchDate;
