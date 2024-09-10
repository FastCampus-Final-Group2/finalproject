"use client";

import Button from "@/components/core/Button";
import DispatchInfo from "./DispatchInfo";
import DestinationInfo from "./DestinationInfo";
import ClientInfo from "./ClientInfo";
import ModalBase from "@/components/detailModal/ModalBase";
import { TransportAPI } from "@/apis/transportOrder";
import { useEffect, useState } from "react";
import { GetTransportOrderByIdData } from "@/models/ApiTypes";

interface OrderModalProps {
  id: number;
  onClose: () => void;
}

const OrderModal = ({ id, onClose }: OrderModalProps) => {
  const [info, setInfo] = useState<GetTransportOrderByIdData | null>(null);

  useEffect(() => {
    TransportAPI.getDetailInfo(id)
      .then(([error, data]) => {
        if (error) {
          onClose();
        }

        setInfo(data);
      })
      .catch(() => {
        onClose();
      });
  }, [id, onClose]);

  if (!info) return null;

  return (
    <ModalBase title="주문 정보">
      <DispatchInfo info={info} />
      {info.destinationInfo && <DestinationInfo info={info.destinationInfo} />}
      {info.clientInfo && <ClientInfo info={info.clientInfo} />}
      <div className="flex w-[680px] justify-end">
        <Button size="s" shape="text" intent="secondary" onClick={() => onClose()}>
          닫기
        </Button>
      </div>
    </ModalBase>
  );
};

export default OrderModal;
