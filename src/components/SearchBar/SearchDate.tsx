"use client";

import { useState, useRef, useEffect } from "react";
import CalendarPicker from "@/components/CalendarPicker";
import Icon from "@/components/core/Icon";
import dayjs from "dayjs";

interface SearchDateProps {
  startDate: string | null;
  endDate: string | null;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  todayDate: string;
  sevenDaysLater: string;
  onSearch: () => void;
}

const SearchDate = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  todayDate,
  sevenDaysLater,
  onSearch,
}: SearchDateProps) => {
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

  const handleDateConfirm = (selectedDateTime: string) => {
    const [selectedDate, selectedTime] = selectedDateTime.split(" ");
    let formattedDate: string;
    const date = dayjs(selectedDate);

    if (dateType === "start") {
      formattedDate = selectedTime !== "--:--" ? selectedDateTime : `${selectedDate} 00:00`;

      if (endDate && dayjs(endDate).diff(date, "day") > 31) {
        alert("31일 기간을 범위로 검색해야 합니다.");
        return;
      }

      // 시작일이 종료일보다 큰지 확인
      if (endDate && date.isAfter(dayjs(endDate))) {
        alert("시작일은 종료일보다 클 수 없습니다.");
        return;
      }

      onStartDateChange(formattedDate);
    } else {
      formattedDate = selectedTime !== "--:--" ? selectedDateTime : `${selectedDate} 23:59`;

      if (startDate && date.diff(dayjs(startDate), "day") > 31) {
        alert("31일 기간을 범위로 검색해야 합니다.");
        return;
      }

      // 종료일이 시작일보다 작은지 확인
      if (startDate && date.isBefore(dayjs(startDate))) {
        alert("종료일은 시작일보다 작을 수 없습니다.");
        return;
      }

      onEndDateChange(formattedDate);
    }

    setIsCalendarOpen(false);
    onSearch();
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

  const formatDate = (date: string) => {
    return dayjs(date).format("YYYY-MM-DD HH:mm");
  };

  const getDisplayDate = (selectedDate: string | null, defaultDate: string) => {
    if (selectedDate && dayjs(selectedDate).isValid()) {
      return formatDate(selectedDate);
    }
    return formatDate(defaultDate);
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
            <span>{getDisplayDate(startDate, todayDate)}</span>
          </p>
          <p>~</p>
          <p
            className="flex cursor-pointer items-center text-SB-14-M"
            onClick={() => toggleCalendar("end")}
            ref={endDateRef}
          >
            <span>{getDisplayDate(endDate, sevenDaysLater)}</span>
          </p>
        </div>
      </div>
      {isCalendarOpen && (
        <div
          ref={calendarRef}
          className="absolute z-50"
          style={{ top: `${calendarPosition.top}px`, left: `${calendarPosition.left}px` }}
        >
          <CalendarPicker onSelectDate={handleDateConfirm} dateType={dateType} />
        </div>
      )}
    </>
  );
};

export default SearchDate;
