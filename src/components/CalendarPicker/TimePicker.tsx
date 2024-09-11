interface TimePickerProps {
  selectedHour: number | null;
  selectedMinute: number | null;
  onHourChange: (hour: number) => void;
  onMinuteChange: (minute: number) => void;
}

const TimePicker = ({ selectedHour, selectedMinute, onHourChange, onMinuteChange }: TimePickerProps) => {
  // 0부터 23까지의 시간을 배열로 생성
  const hours = Array.from({ length: 24 }, (_, i) => i);
  // 0부터 59까지의 분을 배열로 생성
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="flex border-t border-gray-100 py-[5px] text-B-14-M">
      {/* 시 선택 */}
      <div className="relative flex flex-col items-center">
        <ul className="h-[200px] overflow-y-scroll border-r border-gray-100 px-[5px] scrollbar-hide">
          {hours.map((hour) => (
            <li
              key={hour}
              className={`cursor-pointer px-[10px] py-[3px] ${selectedHour === hour ? "bg-blue-100" : ""}`}
              onClick={() => onHourChange(hour)}
            >
              {hour.toString().padStart(2, "0")} {/* 2자리로 표시 */}
            </li>
          ))}
        </ul>
      </div>

      {/* 분 선택 */}
      <div className="flex flex-col items-center">
        <ul className="h-[200px] overflow-y-scroll px-[5px] scrollbar-hide">
          {minutes.map((minute) => (
            <li
              key={minute}
              className={`cursor-pointer px-[10px] py-[3px] ${selectedMinute === minute ? "bg-blue-100" : ""}`}
              onClick={() => onMinuteChange(minute)}
            >
              {minute.toString().padStart(2, "0")} {/* 2자리로 표시 */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimePicker;
