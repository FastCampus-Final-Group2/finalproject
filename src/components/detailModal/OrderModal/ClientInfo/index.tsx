import { ORDER_CLIENT_INFO_KEYS, ORDER_CLIENT_INFO_LABEL } from "@/components/detailModal/OrderModal/index.constants";
import InfoItem from "@/components/detailModal/InfoItem";
import { OrderInfo } from "@/types/order";

interface ClientInfoProps {
  info: NonNullable<OrderInfo["clientInfo"]>;
}

const ClientInfo = ({ info }: ClientInfoProps) => {
  return (
    <div className="flex w-[680px] flex-wrap gap-[18px] gap-x-4 gap-y-[18px] rounded-lg bg-white px-4 py-5">
      <div className="w-[648px] border-b-[1px] border-b-gray-200 px-2.5 pb-[17px] pt-2 text-T-16-B">고객 정보</div>
      {ORDER_CLIENT_INFO_KEYS.map(({ key, line }) => {
        return <InfoItem key={key} label={ORDER_CLIENT_INFO_LABEL[key]} value={info[key]} line={line} />;
      })}
    </div>
  );
};

export default ClientInfo;
