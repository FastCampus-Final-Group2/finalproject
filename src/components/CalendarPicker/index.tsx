"use client";

import { useState } from "react";
import dayjs from "dayjs";
import Calendar from "@/components/CalendarPicker/Calendar";
import TimePicker from "@/components/CalendarPicker/TimePicker";
import Button from "@/components/core/Button";

interface CalendarPickerProps {
  onSelectDate: (dateTime: string) => void;
  pastDisabled?: boolean;
  dateType?: "start" | "end";
}

const CalendarPicker = ({ onSelectDate, dateType, pastDisabled = false }: CalendarPickerProps) => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null);

  const handleDateClick = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
  };

  const handleConfirmClick = () => {
    if (selectedDate) {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      const formattedTime =
        selectedHour !== null && selectedMinute !== null
          ? `${selectedHour.toString().padStart(2, "0")}:${selectedMinute.toString().padStart(2, "0")}`
          : "--:--";
      onSelectDate(`${formattedDate} ${formattedTime}`);
    } else {
      alert("날짜를 선택하세요.");
    }
  };

  return (
    <div className="flex flex-col items-end rounded-[8px] bg-white p-[10px] shadow-md">
      <div className="relative mb-[10px] flex border-b border-gray-100">
        <Calendar startDate={selectedDate} onDateClick={handleDateClick} pastDisabled={pastDisabled} />
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
      <Button
        onClick={handleConfirmClick}
        intent="primary"
        size="i"
        className="bg-blue-500 text-white hover:bg-blue-600"
      >
        확인
      </Button>
    </div>
  );
};

export default CalendarPicker;
