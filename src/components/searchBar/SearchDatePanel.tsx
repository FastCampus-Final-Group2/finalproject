"use client";

import { useState } from "react";
import dayjs from "dayjs";
import Calendar from "@/components/calendar/Calendar";
import TimePicker from "@/components/calendar/TimePicker";

interface SearchDateProps {
  onSelectDate: (date: string) => void;
}

const SearchDatePanel = ({ onSelectDate }: SearchDateProps) => {
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
    <div>
      <div className="relative z-50 flex flex-row items-center bg-white">
        <Calendar startDate={startDate} onDateClick={handleDateClick} />
        <div>
          <div className="flex justify-center">
            <p className="text-B-14-B">
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
      <button onClick={handleConfirmClick}>확인</button>
    </div>
  );
};

export default SearchDatePanel;
