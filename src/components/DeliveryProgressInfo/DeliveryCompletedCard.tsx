import Icon, { IconId } from "@/components/core/Icon";
import { BG_100, BG_650, TEXT_650 } from "@/styles/smColor";

interface DeliveryCompletedCardProps {
  selectedColor: keyof typeof BG_100;
  completedOrderCount: number;
  deliveryOrderCount: number;
  totalTime: string;
  progressionRate: number;
  totalDistance: number;
  refreshData: () => Promise<void>;
}

const formatTotalTime = (totalTime: string): { hours: number; minutes: number } => {
  const [hours, minutes] = totalTime.split(":").map(Number);

  if (isNaN(hours) || isNaN(minutes)) {
    return { hours: 0, minutes: 0 };
  }

  return { hours, minutes };
};

const DeliveryCompletedCard = ({
  selectedColor,
  completedOrderCount,
  deliveryOrderCount,
  totalTime,
  progressionRate,
  totalDistance,
}: DeliveryCompletedCardProps) => {
  const { hours, minutes } = formatTotalTime(totalTime);

  const progressData: {
    title: string;
    count: number | string | JSX.Element;
    unit: string | number;
    iconId: IconId;
    devide: string;
  }[] = [
    {
      title: "완료 주문",
      count: completedOrderCount,
      unit: deliveryOrderCount,
      iconId: "order",
      devide: "/",
    },
    { title: "주행 거리", count: totalDistance.toFixed(1), unit: "km", iconId: "truck", devide: "" },
    {
      title: "주행 시간",
      count: (
        <>
          <span className={`${TEXT_650[selectedColor]} text-T-20-B`}>
            {hours > 0 && (
              <>
                {hours}
                <span className="text-gray-700 text-T-16-B">시간</span>
              </>
            )}
            {minutes > 0 && (
              <>
                {hours > 0 && " "}
                {minutes}
                <span className="text-gray-700 text-T-16-B">분</span>
              </>
            )}
            {hours === 0 && minutes === 0 && "0분"}
          </span>
        </>
      ),
      unit: "",
      iconId: "clock",
      devide: "",
    },
  ];

  return (
    <div className="flex flex-col gap-[12px] px-[12px] pt-[12px]">
      <ul className="flex items-center justify-between gap-[20px] text-gray-700 text-B-14-M">
        <li className="flex items-center gap-[4px]">
          <p>진행률</p>
          <p>
            <span className={`${TEXT_650[selectedColor]} text-T-20-B`}>{progressionRate}</span>
            <span className="text-T-16-B">%</span>
          </p>
        </li>
        <li className={`h-[12px] w-[80px] rounded-full ${BG_100[selectedColor]}`}>
          <p className={`h-[12px] rounded-full ${BG_650[selectedColor]}`} style={{ width: `${progressionRate}%` }}></p>
        </li>
      </ul>
      <div className="text-gray-700 text-B-14-M">
        {progressData.map((data, index) => (
          <ul key={index} className="flex items-center justify-between text-gray-500">
            <li className="flex items-center gap-[4px]">
              <Icon id={data.iconId} size={16} className="text-gray-500" />
              <p>{data.title}</p>
            </li>
            <li className="flex items-end text-gray-700">
              <p className={`${TEXT_650[selectedColor]} text-T-20-B`}>{data.count}</p>
              <p>{data.devide}</p>
              <p className="text-T-16-B">{data.unit}</p>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default DeliveryCompletedCard;
