import Icon, { IconId } from "@/components/core/Icon";
import { BG_100, BG_650, TEXT_650 } from "@/styles/smColor";

interface DeliveryCompletedCardProps {
  selectedColor: keyof typeof BG_100;
  completedOrderCount: number;
  deliveryOrderCount: number;
  totalTime: number;
}
// todo: 주행 거리의 count는 api 연동 후 변경
const DeliveryCompletedCard = ({
  selectedColor,
  completedOrderCount,
  deliveryOrderCount,
  totalTime,
}: DeliveryCompletedCardProps) => {
  const progressData: { title: string; count: number; unit: string | number; iconId: IconId; devide: string }[] = [
    {
      title: "완료 주문",
      count: completedOrderCount,
      unit: deliveryOrderCount,
      iconId: "order",
      devide: "/",
    },
    { title: "주행 거리", count: 23, unit: "km", iconId: "truck", devide: "" },
    { title: "주행 시간", count: totalTime ?? 0, unit: "시간", iconId: "clock", devide: "" },
  ];
  const progressRate = completedOrderCount / deliveryOrderCount;
  return (
    <div className="flex flex-col gap-[12px] px-[12px] pt-[12px]">
      <ul className="flex items-center justify-between gap-[20px] text-gray-700 text-B-14-M">
        <li className="flex items-center gap-[4px]">
          <p>진행률</p>
          <p>
            <span className={`${TEXT_650[selectedColor]} text-T-20-B`}>{progressRate}</span>
            <span className="text-T-16-B">%</span>
          </p>
        </li>
        <li className={`h-[12px] w-[80px] rounded-full ${BG_100[selectedColor]}`}>
          {/* progressRate를 인라인 스타일로 적용 */}
          <p className={`h-[12px] rounded-full ${BG_650[selectedColor]}`} style={{ width: `${progressRate}px` }}></p>
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
