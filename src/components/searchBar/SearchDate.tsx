"use client";

import { useState } from "react";
import CalendarPicker from "@/components/calendarPicker";

const SearchDate = () => {
  const [startDate, setStartDate] = useState<string>("YYYY-MM-DD --:--");
  const [endDate, setEndDate] = useState<string>("YYYY-MM-DD --:--");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateType, setDateType] = useState<"start" | "end">("start"); // Track which date to set

  const handleDateConfirm = (date: string) => {
    if (dateType === "start") {
      setStartDate(date);
    } else if (dateType === "end") {
      setEndDate(date);
    }
    setIsCalendarOpen(false); // 버튼 눌러서 캘린더 닫기
  };

  const toggleCalendar = (type: "start" | "end") => {
    setDateType(type);
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <>
      <div className="flex w-fit gap-[12px] rounded-[8px] p-[12px] text-T-16-B">
        <div>상하차시작일시</div>
        <p className="flex cursor-pointer items-center text-SB-14-M" onClick={() => toggleCalendar("start")}>
          <span>{startDate}</span> {/* 검색 시작일 설정 */}
        </p>
        <p>~</p>
        <p className="flex cursor-pointer items-center text-SB-14-M" onClick={() => toggleCalendar("end")}>
          <span>{endDate}</span> {/* 검색 종료일 설정 */}
        </p>
      </div>
      {isCalendarOpen && (
        <div className="absolute top-16 z-50">
          <CalendarPicker onSelectDate={handleDateConfirm} />
        </div>
      )}
    </>
  );
};

export default SearchDate;
