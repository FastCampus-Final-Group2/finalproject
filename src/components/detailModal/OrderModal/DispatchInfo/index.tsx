import {
  ORDER_DISPATCH_INFO_KEYS,
  ORDER_DISPATCH_INFO_LABEL,
} from "@/components/detailModal/OrderModal/index.constants";
import InfoItem from "@/components/detailModal/InfoItem";
import { GetTransportOrderByIdData } from "@/models/ApiTypes";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

interface DispatchInfoProps {
  info: GetTransportOrderByIdData;
}

const DispatchInfo = ({ info }: DispatchInfoProps) => {
  return (
    <div className="flex w-[680px] flex-wrap gap-[18px] gap-x-4 gap-y-[18px] rounded-lg bg-white px-4 py-5">
      <div className="w-[648px] border-b-[1px] border-b-gray-200 px-2 pb-3 pt-1 text-B-14-B">{`운송장 번호 : ${info.shipmentNumber}`}</div>
      {ORDER_DISPATCH_INFO_KEYS.map(({ key, line }) => {
        const formatValue = (() => {
          switch (key) {
            case "orderDate":
              return dayjs(info[key], "YYYY-MM-DD").format("YYYY.MM.DD");
            case "requestedWorkDate":
              return dayjs(info[key], "YYYY-MM-DD").format("YY-MM-DD");
            case "requestedArrivalTime":
            case "estimatedWorkTime":
              return dayjs(String(info[key]), "HH:mm:ss").format("HH:mm");
            default:
              return String(info[key]);
          }
        })();

        return <InfoItem key={key} label={ORDER_DISPATCH_INFO_LABEL[key]} value={formatValue} line={line} />;
      })}
    </div>
  );
};

export default DispatchInfo;
