"use client";

import { useDeliveryModalEditContext } from "@/contexts/DeliveryModalEditContext";

const DelayTimeInput = () => {
  const { hour, setHour, minute, setMinute } = useDeliveryModalEditContext();

  const handleHourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    const num = parseInt(input, 10);

    if (num >= 0 && num <= 23) setHour(num);
    if (num > 24) setHour(0);
    if (num < 0) setHour(23);
  };

  const handleMinuteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    const num = parseInt(input, 10);

    if (num >= 0 && num <= 59) setMinute(num);
    if (num > 59) setMinute(0);
    if (num < 0) setMinute(59);
  };

  return (
    <div className="flex w-full gap-4">
      <div className="flex h-9 w-[125px] items-center py-2 pl-2.5 text-gray-900 text-T-16-B">작업추가 소요시간</div>
      <div className="flex h-9 overflow-hidden rounded-4 border border-gray-200">
        <input
          className="flex h-9 w-11 items-center justify-center bg-blue-30 text-center text-gray-900 text-B-14-M"
          type="number"
          value={hour.toString().padStart(2, "0")}
          onChange={handleHourChange}
          step={1}
        />
        <div className="flex h-9 w-11 items-center justify-center border-x border-x-gray-100 text-center text-gray-900 text-B-14-M">
          시간
        </div>
        <input
          className="flex h-9 w-11 items-center justify-center border-l border-l-gray-100 bg-blue-30 text-center text-gray-900 text-B-14-M"
          type="number"
          value={minute.toString().padStart(2, "0")}
          onChange={handleMinuteChange}
          step={1}
        />
        <div className="flex h-9 w-11 items-center justify-center text-center text-gray-900 text-B-14-M">분</div>
      </div>
    </div>
  );
};

export default DelayTimeInput;
