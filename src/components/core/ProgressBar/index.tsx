import { useEffect, useState } from "react";

export interface ProgressBarProps {
  time?: number;
  intervalTime?: number;
  awaitFn?: () => Promise<void> | void;
  onLoadingEnd?: () => void;
  onError?: () => void;
}

const ProgressBar = ({ time = 3000, intervalTime = 3, awaitFn, onLoadingEnd, onError }: ProgressBarProps) => {
  const [progressWidth, setProgressWidth] = useState("0%");

  useEffect(() => {
    const handleProgressWidth = async () => {
      const interval = setInterval(() => {
        setProgressWidth((prev) => {
          const currentWidth = parseInt(prev);
          return `${Math.min(currentWidth + Math.floor(Math.random() * Math.floor(90 / intervalTime + 1)), 90)}%`;
        });
      }, time / intervalTime);

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
  }, [awaitFn, intervalTime, onError, onLoadingEnd, time]);

  return (
    <div className={`relative h-3 w-full rounded-full bg-blue-100`}>
      <div
        className="absolute left-0 h-full w-0 rounded-full bg-blue-500 transition-[width] duration-1000 ease-out"
        style={{ width: progressWidth }}
      ></div>
    </div>
  );
};

export default ProgressBar;
