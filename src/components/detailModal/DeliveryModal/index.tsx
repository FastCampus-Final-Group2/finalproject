"use client";

import ModalBase from "@/components/detailModal/ModalBase";
import DeliveryInfo from "./DeliveryInfo";
import AffiliationCenterInfo from "./AffiliationCenterInfo";
import { DeliveryModalEditContextProvider } from "@/contexts/DeliveryModalEditContext";
import EditButtons from "./EditButtons";
import { parseRestrictedTonCode } from "@/utils/tonCode";

interface DeliveryModalProps {
  id: number;
  info: DeliveryInfo;
  isCenter: boolean;
  onClose: () => void;
}

const DeliveryModal = ({ id, info, isCenter, onClose }: DeliveryModalProps) => {
  return (
    <ModalBase title={isCenter ? "센터 상세정보" : "배송처 상세정보"}>
      <DeliveryModalEditContextProvider
        initialComment={info.comment}
        initialDelayTime={info.delayTime}
        initialRestrictedTonCode={parseRestrictedTonCode(info.restrictedTonCode)}
      >
        <DeliveryInfo id={id} info={info} isCenter={isCenter} />
        {isCenter || (
          <AffiliationCenterInfo
            centerId={info.centerId}
            centerName={info.centerName}
            basicAddress={info.basicAddress}
          />
        )}
        <EditButtons updateAt={info.updateAt} onClose={onClose} />
      </DeliveryModalEditContextProvider>
    </ModalBase>
  );
};

export default DeliveryModal;
