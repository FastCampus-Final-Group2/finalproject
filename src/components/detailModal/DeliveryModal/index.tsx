"use client";

import ModalBase from "@/components/detailModal/ModalBase";
import DeliveryInfo from "./DeliveryInfo";
import AffiliationCenterInfo from "./AffiliationCenterInfo";
import { DeliveryModalEditContextProvider } from "@/contexts/DeliveryModalEditContext";
import EditButtons from "./EditButtons";
import { parseRestrictedTonString } from "@/utils/tonCode";
import { isCenterData } from "@/types/typeGuard/delivery";
import { useEffect, useState } from "react";
import { GetCenterData, GetDeliveryDestinationData } from "@/models/ApiTypes";
import { CenterAPI } from "@/apis/center";
import { DestinationAPI } from "@/apis/deliveryDestination";

interface DeliveryModalProps {
  id: number;
  isCenter: boolean;
  onClose: () => void;
}

const DeliveryModal = ({ id, isCenter, onClose }: DeliveryModalProps) => {
  const [info, setInfo] = useState<GetDeliveryDestinationData | GetCenterData | null>(null);

  useEffect(() => {
    if (isCenter) {
      CenterAPI.getDetailInfo(id)
        .then(([error, data]) => {
          if (error) {
            onClose();
          }

          setInfo(data);
        })
        .catch(() => {
          onClose();
        });
    } else {
      DestinationAPI.getDetailInfo(id)
        .then(([error, data]) => {
          if (error) {
            onClose();
          }

          setInfo(data);
        })
        .catch(() => {
          onClose();
        });
    }
  }, [id, isCenter, onClose]);

  if (!info) return null;

  return (
    <ModalBase title={isCenter ? "센터 상세정보" : "배송처 상세정보"}>
      <DeliveryModalEditContextProvider
        initialComment={info.comment || ""}
        initialDelayTime={info.delayTime || 0}
        initialRestrictedWing={parseRestrictedTonString(info.restrictedWingBody || "")}
        initialRestrictedTop={parseRestrictedTonString(info.restrictedBox || "")}
        initialRestrictedCargo={parseRestrictedTonString(info.restrictedCargo || "")}
      >
        <DeliveryInfo info={info} />
        {!isCenterData(info) && (
          <AffiliationCenterInfo
            centerCode={info.centerCode || ""}
            centerName={info.centerName || ""}
            address={info.centerRoadAddress || info.centerLotNumberAddress || ""}
          />
        )}
        <EditButtons id={id} updateAt={info.updateAt} onClose={onClose} isCenter={isCenter} setInfo={setInfo} />
      </DeliveryModalEditContextProvider>
    </ModalBase>
  );
};

export default DeliveryModal;
