import Icon, { IconId } from "@/components/core/Icon";

// todo: 완료 주문의 unit은 api 연동 후 변경

const progressData: { title: string; count: number; unit: string | number; iconId: IconId; devide: string }[] = [
  { title: "완료 주문", count: 10, unit: 20, iconId: "order", devide: "/" },
  { title: "주행 거리", count: 23, unit: "km", iconId: "truck", devide: "" },
  { title: "주행 시간", count: 16, unit: "시간", iconId: "clock", devide: "" },
];

const DeliveryProgressInfo = () => {
  const progressRate = (80 / 100) * 50;
  return (
    <div className="flex flex-col gap-[12px]">
      <ul className="flex items-center justify-between gap-[20px] text-gray-700 text-B-14-M">
        <li className="flex items-center gap-[4px]">
          <p>진행률</p>
          <p>
            <span className="text-lime-650 text-T-20-B">50</span>
            <span className="text-T-16-B">%</span>
          </p>
        </li>
        <li className="h-[12px] w-[80px] rounded-full bg-lime-100">
          <p className={`h-[12px] w-[${progressRate}px] rounded-full bg-lime-650`}></p>
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
              <p className="text-lime-650 text-T-20-B">{data.count}</p>
              <p>{data.devide}</p>
              <p className="text-T-16-B">{data.unit}</p>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default DeliveryProgressInfo;
