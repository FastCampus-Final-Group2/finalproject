"use client";

import { useState } from "react";
import dayjs from "dayjs";
import Calendar from "@/components/CalendarPicker/Calendar";
import TimePicker from "@/components/CalendarPicker/TimePicker";
import Button from "@/components/core/Button";

interface SearchDateProps {
  onSelectDate: (date: string) => void;
}

const CalendarPicker = ({ onSelectDate }: SearchDateProps) => {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null);

  const handleDateClick = (date: dayjs.Dayjs) => {
    setStartDate(date);
  };

  const handleConfirmClick = () => {
    if (startDate !== null && selectedHour !== null && selectedMinute !== null) {
      const dateTime = startDate.hour(selectedHour).minute(selectedMinute).format("YYYY-MM-DD HH:mm");
      onSelectDate(dateTime);
    } else {
      alert("날짜와 시간을 모두 선택하세요.");
    }
  };

  return (
    <div className="flex flex-col items-end rounded-[8px] bg-white p-[10px] shadow-md">
      <div className="relative mb-[10px] flex border-b border-gray-100">
        <Calendar startDate={startDate} onDateClick={handleDateClick} />
        <div>
          <div className="flex h-[29.5px] justify-center">
            <p className="flex items-center text-B-14-B">
              {selectedHour !== null && selectedMinute !== null
                ? `${selectedHour.toString().padStart(2, "0")}:${selectedMinute.toString().padStart(2, "0")}`
                : ""}
            </p>
          </div>
          <TimePicker
            selectedHour={selectedHour}
            selectedMinute={selectedMinute}
            onHourChange={setSelectedHour}
            onMinuteChange={setSelectedMinute}
          />
        </div>
      </div>
      <Button onClick={handleConfirmClick} intent="primary" size="s">
        확인
      </Button>
    </div>
  );
};

export default CalendarPicker;
