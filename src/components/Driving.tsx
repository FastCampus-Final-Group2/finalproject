"use client";

import { useState } from "react";

const drivingStates = ["주행중", "주행대기", "주행완료"];
// 숫자는 추후 API 연동 시 데이터 받아와서 적용
const drivingStatesNumber = [10, 4, 12];

const Driving = () => {
  const [selectedState, setSelectedState] = useState(drivingStates[0]);

  return (
    <div className="flex h-[48px] text-T-18-B">
      {drivingStates.map((state, index) => (
        <ul
          key={state}
          className={`relative flex cursor-pointer items-center p-[12px] ${selectedState === state ? "" : "text-gray-700"}`}
          onClick={() => setSelectedState(state)}
        >
          <li>{state}</li>
          <li className={`ml-2 ${selectedState === state ? "text-blue-500" : "text-gray-300"}`}>
            {drivingStatesNumber[index]}
          </li>
          {selectedState === state && <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-blue-500"></div>}
        </ul>
      ))}
    </div>
  );
};

export default Driving;
