import { TEXT_100, TEXT_650 } from "@/styles/smColor";

interface CircularProgressBarProps {
  percentage: number;
  bgColor: keyof typeof TEXT_100 | "blue";
}

const CircularProgressBar = ({ percentage, bgColor }: CircularProgressBarProps) => {
  const radius = 30; // 반지름
  const stroke = 4; // 두께
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  // 100을 초과하면 100으로 설정
  const limitedPercentage = Math.min(percentage, 100);
  const strokeDashoffset = circumference - (limitedPercentage / 100) * circumference;

  // 색상을 조건에 따라 동적으로 변경
  let backgroundClass = "text-gray-200";
  let foregroundClass = "text-gray-400";

  if (percentage > 100) {
    backgroundClass = "text-red-100";
    foregroundClass = "text-red-500";
  } else if (percentage === 0) {
    backgroundClass = "text-gray-200";
    foregroundClass = "text-gray-400";
  } else if (bgColor === "blue") {
    backgroundClass = "text-blue-50";
    foregroundClass = "text-blue-500";
  } else {
    backgroundClass = TEXT_100[bgColor];
    foregroundClass = TEXT_650[bgColor];
  }

  return (
    <div className="inline-flex h-[60px] w-[101px] items-start justify-start gap-1">
      <div className="h-[20px] w-[37px] text-gray-500 text-B-14-M">용적률</div>
      <div className="relative h-[60px] w-[60px]">
        <svg height={radius * 2} width={radius * 2} className="-rotate-90 transform">
          <circle
            className={backgroundClass}
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            className={foregroundClass}
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[22px] min-w-[12px] text-center text-gray-900 text-B-14-B">{percentage}</div>
          <div className="h-[20px] w-[14px] text-center text-gray-900 text-B-14-B">%</div>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBar;
