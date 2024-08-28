"use client";

import CalendarPicker from "@/components/CalendarPicker";
import Icon from "@/components/core/Icon";
import { cn } from "@/utils/cn";
import { useMemo, useReducer, useState } from "react";
import { buttonVariants } from "./index.variants";

const LoadingStartTimePicker = () => {
  const [isCalendarOpen, toggleCalendar] = useReducer((v) => !v, false);
  const [startDate, setStartDate] = useState<string>("YYYY-MM-DD --:--");

  const startDateText = useMemo(() => {
    return startDate.split(" ");
  }, [startDate]);

  const isError = useMemo(() => {
    return startDate === "YYYY-MM-DD --:--";
  }, [startDate]);

  const handleCalendarConfirm = (date: string) => {
    setStartDate(date);
    toggleCalendar();
  };

  return (
    <div className="relative flex items-center justify-center gap-2.5">
      <button type="button" className={cn(buttonVariants({ isError }))} onClick={() => toggleCalendar()}>
        <span className="flex gap-2">
          <Icon id="event" size={20} className="text-gray-800" />
          <span className="text-gray-900 text-T-16-B">상차시작일시</span>
        </span>
        <span className="text-gray-900 text-B-14-M">{startDateText[0]}</span>
        <span className="text-gray-900 text-B-14-M">{`${startDateText[1]} 시작`}</span>
      </button>
      {isError && <span className="text-red-500 text-C-12-M">상차시작일시를 입력해주세요.</span>}
      {isCalendarOpen && (
        <div className="absolute z-50">
          <CalendarPicker onSelectDate={handleCalendarConfirm} />
        </div>
      )}
    </div>
  );
};

export default LoadingStartTimePicker;
