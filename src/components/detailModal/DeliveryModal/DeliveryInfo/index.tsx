"use client";

import type { DeliveryInfo } from "@/types/order";
import { DELIVERY_INFO_KEYS, DELIVERY_INFO_LABEL } from "@/components/detailModal/DeliveryModal/index.constants";
import InfoItem from "@/components/detailModal/InfoItem";
import DelayTimeInput from "./DelayTimeInput";
import CommentInput from "./CommentInput";
import RestrictedTonCodeInput from "./RestrictedTonCodeInput";

interface DeliveryInfoProps {
  id: number;
  info: DeliveryInfo;
  isCenter: boolean;
}

const DeliveryInfo = ({ id, info, isCenter }: DeliveryInfoProps) => {
  return (
    <div className="flex w-[680px] flex-wrap gap-[18px] gap-x-4 gap-y-[18px] rounded-lg bg-white px-4 py-5">
      {DELIVERY_INFO_KEYS.map(({ key, line }) => {
        if (key === "deliveryDestinationCode")
          return (
            <InfoItem
              key={key}
              label={DELIVERY_INFO_LABEL[isCenter ? "center" : "destination"][key]}
              value={id}
              line={line}
            />
          );

        if (key === "latitude/longitude") {
          return (
            <InfoItem
              key={key}
              label={DELIVERY_INFO_LABEL[isCenter ? "center" : "destination"][key]}
              value={`${info.latitude}/${info.longitude}`}
              line={line}
            />
          );
        }
        return (
          <InfoItem
            key={key}
            label={DELIVERY_INFO_LABEL[isCenter ? "center" : "destination"][key]}
            value={info[key]}
            line={line}
          />
        );
      })}
      <DelayTimeInput />
      <CommentInput />
      <RestrictedTonCodeInput />
    </div>
  );
};

export default DeliveryInfo;
