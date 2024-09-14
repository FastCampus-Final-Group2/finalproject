"use client";

import { useState, useRef, useEffect } from "react";
import CalendarPicker from "@/components/CalendarPicker";
import Icon from "@/components/core/Icon";

interface SearchDateProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

const SearchDate = ({ startDate, endDate, onStartDateChange, onEndDateChange }: SearchDateProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateType, setDateType] = useState<"start" | "end">("start");
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });

  const startDateRef = useRef<HTMLParagraphElement>(null);
  const endDateRef = useRef<HTMLParagraphElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateConfirm = (date: string) => {
    if (dateType === "start") {
      onStartDateChange(date);
    } else if (dateType === "end") {
      onEndDateChange(date);
    }
    setIsCalendarOpen(false);
  };

  const toggleCalendar = (type: "start" | "end") => {
    const targetRef = type === "start" ? startDateRef : endDateRef;
    const rect = targetRef.current?.getBoundingClientRect();

    if (rect) {
      setCalendarPosition({
        top: rect.bottom + window.scrollY + 10,
        left: rect.left + window.scrollX,
      });
    }

    setDateType(type);
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <>
      <div className="flex h-full w-fit items-center gap-[12px] rounded-[8px] border border-gray-200 p-[12px] text-T-16-B">
        <div className="flex h-[24px] items-center">상하차시작일시</div>
        <Icon id="calendar" size={18} />
        <div className="flex w-[270px] justify-between">
          <p
            className="flex cursor-pointer items-center text-SB-14-M"
            onClick={() => toggleCalendar("start")}
            ref={startDateRef}
          >
            <span>{startDate}</span> {/* 검색 시작일 설정 */}
          </p>
          <p>~</p>
          <p
            className="flex cursor-pointer items-center text-SB-14-M"
            onClick={() => toggleCalendar("end")}
            ref={endDateRef}
          >
            <span>{endDate}</span> {/* 검색 종료일 설정 */}
          </p>
        </div>
      </div>
      {isCalendarOpen && (
        <div
          ref={calendarRef}
          className="absolute z-50"
          style={{ top: `${calendarPosition.top}px`, left: `${calendarPosition.left}px` }}
        >
          <CalendarPicker onSelectDate={handleDateConfirm} />
        </div>
      )}
    </>
  );
};

export default SearchDate;
