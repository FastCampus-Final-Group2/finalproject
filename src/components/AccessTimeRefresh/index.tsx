"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/core/Icon";
import dayjs from "dayjs";

const AccessTimeRefresh = ({ onClick }: { onClick: () => Promise<void> }) => {
  const [accessTime, setAccessTime] = useState("");

  useEffect(() => {
    const currentTime = dayjs().format("HH:mm:ss");
    setAccessTime(currentTime);
  }, []);

  const handleRefresh = async () => {
    const currentTime = dayjs().format("HH:mm:ss");
    setAccessTime(currentTime);
    await onClick();
    console.log("AccessTimeRefresh.tsx에서 새로고침 발생");
  };

  return (
    <div className="pr-[12px]">
      <ul className="flex items-center gap-[4px] text-gray-300 text-B-14-M">
        <li>{accessTime} 기준</li>
        <li className="cursor-pointer" onClick={handleRefresh}>
          <Icon id="restart" className="text-gray-300" size={18} />
        </li>
      </ul>
    </div>
  );
};

export default AccessTimeRefresh;
