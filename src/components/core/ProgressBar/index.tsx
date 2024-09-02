import { BgColorType } from "@/types/color";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  bgColor?: BgColorType;
  time?: number;
  awaitFn?: () => Promise<void>;
  onLoadingEnd: () => void;
}

const ProgressBar = ({ bgColor = "bg-gray-900", time = 5000, awaitFn, onLoadingEnd }: ProgressBarProps) => {
  const [progressWidth, setProgressWidth] = useState("0%");

  useEffect(() => {
    const handleProgressWidth = async () => {
      const interval = setInterval(() => {
        setProgressWidth((prev) => {
          const currentWidth = parseInt(prev);
          console.log(`${Math.min(currentWidth + 10, 90)}%`);
          return `${Math.min(currentWidth + 10, 90)}%`;
        });
      }, time / 5);

      if (awaitFn) await awaitFn();

      clearInterval(interval);
      setProgressWidth("100%");

      setTimeout(() => {
        onLoadingEnd();
      }, 1000);
    };

    handleProgressWidth().catch((error) => {
      console.error("Error in AwaitFunction:", error);
    });
  }, [awaitFn, onLoadingEnd, time]);

  return (
    <div className="relative h-3 w-full rounded-full bg-gray-200">
      <div
        className={`absolute left-0 h-full w-0 rounded-full transition-[width] duration-1000 ease-out ${bgColor}`}
        style={{ width: progressWidth }}
      ></div>
    </div>
  );
};

export default ProgressBar;
