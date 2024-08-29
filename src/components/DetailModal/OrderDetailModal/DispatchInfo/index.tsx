import { OrderDetailBase } from "@/types/order";
import {
  ORDER_DETAIL_DISPATCH_INFO_KEYS,
  ORDER_DETAIL_DISPATCH_INFO_LABEL,
} from "@/components/DetailModal/OrderDetailModal/index.constants";
import InfoItem from "@/components/DetailModal/OrderDetailModal/InfoItem";

interface DispatchInfoProps {
  info: OrderDetailBase;
}

const DispatchInfo = ({ info }: DispatchInfoProps) => {
  return (
    <div className="flex flex-wrap gap-[18px] gap-x-4 gap-y-[18px] rounded-lg bg-white px-4 py-5">
      <div className="w-[648px] border-b-[1px] border-b-gray-200 px-2 pb-3 pt-1 text-B-14-B">{`운송장 번호 : ${info.transportOrderNumber}`}</div>
      {ORDER_DETAIL_DISPATCH_INFO_KEYS.map(({ key, line }) => {
        return <InfoItem key={key} label={ORDER_DETAIL_DISPATCH_INFO_LABEL[key]} value={info[key]} line={line} />;
      })}
    </div>
  );
};

export default DispatchInfo;
