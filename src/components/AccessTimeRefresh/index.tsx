"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/core/Icon";
import dayjs from "dayjs";

const AccessTimeRefresh = () => {
  // todo: 데이터 새로고침 기능 넣기
  const [accessTime, setAccessTime] = useState("");

  useEffect(() => {
    const currentTime = dayjs().format("HH:mm:ss");
    setAccessTime(currentTime);
  }, []);

  return (
    <div>
      <ul className="flex items-center justify-end gap-[4px] text-gray-300 text-B-14-M">
        <li>{accessTime} 기준</li>
        <li>
          <Icon id="restart" className="text-gray-300" size={18} />
        </li>
      </ul>
    </div>
  );
};

export default AccessTimeRefresh;
