const CircularProgressBar = ({ percentage, color }) => {
  const radius = 30; // 반지름
  const stroke = 4; // 두께
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // const backgroundClass = color === 'blue' ? 'text-blue-50' : color === 'lime' ? 'text-lime-100' : 'text-gray-200';
  // const foregroundClass = color === 'blue' ? 'text-blue-500' : color === 'lime' ? 'text-lime-650' : 'text-gray-900';
  const backgroundClass = color === 'blue' ? 'text-blue-50' : 'text-lime-100';
  const foregroundClass = color === 'blue' ? 'text-blue-500' : 'text-lime-650';  

  return (
    <div className="w-[101px] h-[60px] justify-start items-start gap-1 inline-flex">
      <div className="w-[37px] h-[20px] text-[#808080] text-14">용적률</div>
      <div className="w-[60px] h-[60px] relative">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
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
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-[24px] h-[22px] text-gray-900 text-T-18-B">{percentage}</div>
          <div className="w-[14px] h-[20px] text-gray-900 text-B-14-B">%</div>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBar;