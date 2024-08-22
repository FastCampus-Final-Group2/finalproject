"use client";

import Icon from "@/components/core/Icon";
import { useState } from "react";
import CalendarPicker from "@/components/calendarPicker";

const SearchDate = () => {
  const [startDate, setStartDate] = useState<string>("연-월-일 --:-- 시작");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // SearchDate에서 확인 버튼을 눌렀을 때 호출되는 함수
  const handleDateConfirm = (date: string) => {
    setStartDate(date);
    setIsCalendarOpen(false); // 달력을 닫음
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  return (
    <>
      <div className="flex w-fit gap-[12px] rounded-[8px] border border-gray-200 p-[12px] text-T-16-B">
        <div>상하차시작일시</div>
        <p className="flex cursor-pointer items-center text-SB-14-M" onClick={toggleCalendar}>
          <Icon id="clock" />
          <span>{startDate}</span> {/* 선택 날짜 표시 */}
        </p>
      </div>
      {/* isCalendarOpen이 true일 때 SearchDate 컴포넌트 표시 */}
      {isCalendarOpen && (
        <div className="absolute top-16 z-50">
          <CalendarPicker onSelectDate={handleDateConfirm} />
        </div>
      )}
    </>
  );
};

export default SearchDate;
