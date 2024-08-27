interface CircularProgressBarProps {
  percentage: number;
  color: string;
}

const CircularProgressBar = ({ percentage, color }: CircularProgressBarProps) => {
  const radius = 30; // 반지름
  const stroke = 4; // 두께
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // const backgroundClass = color === 'blue' ? 'text-blue-50' : color === 'lime' ? 'text-lime-100' : 'text-gray-200';
  // const foregroundClass = color === 'blue' ? 'text-blue-500' : color === 'lime' ? 'text-lime-650' : 'text-gray-900';
  const backgroundClass = color === "blue" ? "text-blue-50" : "text-lime-100";
  const foregroundClass = color === "blue" ? "text-blue-500" : "text-lime-650";

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
          <div className="h-[22px] w-[24px] text-gray-900 text-T-18-B">{percentage}</div>
          <div className="h-[20px] w-[14px] text-gray-900 text-B-14-B">%</div>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBar;
