import { ORDER_DETAIL_DELIVERY_INFO_KEYS, ORDER_DETAIL_TEXT_MAP } from "@/components/OrderDetailModal/index.constants";
import InfoItem from "@/components/OrderDetailModal/InfoItem";

interface DeliveryInfoProps {
  info: { managerName: string; phoneNumber: string; deliveryDestinationCode: number };
}

const DeliveryInfo = ({ info }: DeliveryInfoProps) => {
  return (
    <div className="flex flex-wrap gap-[18px] gap-x-4 gap-y-[18px] rounded-lg bg-white px-4 py-5">
      <div className="w-[648px] border-b-[1px] border-b-gray-200 px-2.5 pb-[17px] pt-2 text-T-16-B">배송처 정보</div>
      {ORDER_DETAIL_DELIVERY_INFO_KEYS.map(({ key, line }) => {
        return <InfoItem key={key} label={ORDER_DETAIL_TEXT_MAP[key]} value={info[key]} line={line} />;
      })}
    </div>
  );
};

export default DeliveryInfo;
