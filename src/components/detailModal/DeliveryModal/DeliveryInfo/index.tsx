"use client";

import { DELIVERY_INFO_KEYS, DELIVERY_INFO_LABEL } from "@/components/detailModal/DeliveryModal/index.constants";
import InfoItem from "@/components/detailModal/InfoItem";
import DelayTimeInput from "./DelayTimeInput";
import CommentInput from "./CommentInput";
import RestrictedTonCodeInput from "./RestrictedTonCodeInput";
import { GetCenterData, GetDeliveryDestinationData } from "@/models/ApiTypes";
import { isCenterData } from "@/types/typeGuard/delivery";

interface DeliveryInfoProps {
  info: GetDeliveryDestinationData | GetCenterData;
}

const DeliveryInfo = ({ info }: DeliveryInfoProps) => {
  return (
    <div className="flex w-[680px] flex-wrap gap-[18px] gap-x-4 gap-y-[18px] rounded-lg bg-white px-4 py-5">
      {isCenterData(info)
        ? DELIVERY_INFO_KEYS.center.map(({ key, line }) => {
            return <InfoItem key={key} label={DELIVERY_INFO_LABEL.center[key]} value={info[key]} line={line} />;
          })
        : DELIVERY_INFO_KEYS.destination.map(({ key, line }) => {
            return <InfoItem key={key} label={DELIVERY_INFO_LABEL.destination[key]} value={info[key]} line={line} />;
          })}
      {DELIVERY_INFO_KEYS.default.map(({ key, line }) => {
        if (key === "latitude/longitude") {
          return (
            <InfoItem
              key={key}
              label={DELIVERY_INFO_LABEL.default[key]}
              value={`${info.latitude} / ${info.longitude}`}
              line={line}
            />
          );
        }

        if (key === "address") {
          return (
            <InfoItem
              key={key}
              label={DELIVERY_INFO_LABEL.default[key]}
              value={info.roadAddress || info.lotNumberAddress}
              line={line}
            />
          );
        }

        return <InfoItem key={key} label={DELIVERY_INFO_LABEL.default[key]} value={info[key]} line={line} />;
      })}
      <DelayTimeInput />
      <CommentInput />
      <RestrictedTonCodeInput />
    </div>
  );
};

export default DeliveryInfo;
