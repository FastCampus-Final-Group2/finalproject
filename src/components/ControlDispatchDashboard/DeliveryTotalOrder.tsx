import Icon from "@/components/core/Icon";
import AccessTimeRefresh from "@/components/AccessTimeRefresh";

interface DeliveryTotalOrdersProps {
  deliveryProgress: number;
  totalOrders: number;
  completedOrder: number;
  issueOrder: number;
  refreshData: () => Promise<void>;
}

const DeliveryTotalOrders = ({
  deliveryProgress,
  completedOrder,
  totalOrders,
  issueOrder,
  refreshData,
}: DeliveryTotalOrdersProps) => {
  return (
    <div className="flex h-[116px] w-[460px] flex-col rounded-[8px] bg-white px-[20px] pb-[4px] pt-[12px] text-gray-500 text-B-14-M">
      <div className="pl-[12px]">
        <AccessTimeRefresh onClick={refreshData} />
      </div>

      <div className="flex h-[80px] items-center justify-between px-[13px]">
        {/* 진행률 */}
        <div className="flex flex-col items-center gap-[4px]">
          <ul className="flex gap-[4px]">
            <li className="flex items-center">진행률</li>
            <li className="flex items-center">
              <p className="text-blue-500 text-T-20-B">{deliveryProgress}</p>
              <p className="text-gray-700 text-T-16-B">%</p>
            </li>
          </ul>
          <div>
            <div className="relative h-[12px] w-[82px] rounded-full bg-blue-50">
              <div
                className="absolute h-[12px] rounded-full bg-blue-500"
                style={{ width: `${deliveryProgress}px` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 완료 주문 */}
        <div className="relative flex flex-col items-center justify-between before:absolute before:left-1/2 before:top-1/2 before:h-[60px] before:w-[156px] before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:border-x before:border-gray-50">
          <ul className="flex items-center justify-center gap-[4px]">
            <Icon id="order" size={14} className="text-gray-500" />
            <li className="text-gray-500 text-B-14-M">완료 주문</li>
          </ul>
          <ul className="flex items-center justify-end gap-[2px] text-right">
            <li className="text-blue-500 text-T-20-B">{completedOrder}</li>
            <li className="text-gray-700 text-T-16-B">/</li>
            <li className="text-gray-700 text-T-16-B">{totalOrders}</li>
          </ul>
        </div>

        {/* 이슈 주문 */}
        <div className="flex flex-col items-end justify-center">
          <ul className="flex items-center justify-center gap-[4px]">
            <Icon id="warning" size={14} className="text-gray-500" />
            <li className="text-gray-500 text-B-14-M">이슈 주문</li>
          </ul>
          <ul className="flex items-center justify-end text-right">
            <li className="text-red-500 text-T-20-B">{issueOrder}</li>
            <li className="text-gray-700 text-T-16-B">건</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTotalOrders;
