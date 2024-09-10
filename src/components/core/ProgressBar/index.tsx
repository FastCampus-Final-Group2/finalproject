import { BgColorType } from "@/types/color";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  barColor?: BgColorType;
  bgColor?: BgColorType;
  time?: number;
  awaitFn?: () => Promise<void> | void;
  onLoadingEnd?: () => void;
  onError?: () => void;
}

const ProgressBar = ({
  bgColor = "bg-gray-900",
  barColor = "bg-gray-200",
  time = 3000,
  awaitFn,
  onLoadingEnd,
  onError,
}: ProgressBarProps) => {
  const [progressWidth, setProgressWidth] = useState("0%");

  useEffect(() => {
    const handleProgressWidth = async () => {
      const interval = setInterval(() => {
        setProgressWidth((prev) => {
          const currentWidth = parseInt(prev);
          return `${Math.min(currentWidth + Math.floor(Math.random() * 31), 90)}%`;
        });
      }, time / 3);

      if (awaitFn) {
        await awaitFn();
      }

      clearInterval(interval);
      setProgressWidth("100%");

      if (onLoadingEnd) {
        setTimeout(() => {
          onLoadingEnd();
        }, 1000);
      }
    };

    handleProgressWidth().catch(() => {
      if (onError) onError();
    });
  }, [awaitFn, onError, onLoadingEnd, time]);

  return (
    <div className={`${bgColor} relative h-3 w-full rounded-full`}>
      <div
        className={`absolute left-0 h-full w-0 rounded-full transition-[width] duration-1000 ease-out ${barColor}`}
        style={{ width: progressWidth }}
      ></div>
    </div>
  );
};

export default ProgressBar;
