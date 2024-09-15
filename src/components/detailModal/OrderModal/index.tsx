"use client";

import Button from "@/components/core/Button";
import DispatchInfo from "./DispatchInfo";
import DestinationInfo from "./DestinationInfo";
import ClientInfo from "./ClientInfo";
import ModalBase from "@/components/detailModal/ModalBase";
import { TransportAPI } from "@/apis/transportOrder";
import { useEffect, useState } from "react";
import { GetTransportOrderByIdData } from "@/models/ApiTypes";
import { useSetRecoilState } from "recoil";
import { userState } from "@/atoms/user";

interface OrderModalProps {
  id: number;
  orderInfo?: GetTransportOrderByIdData;
  onClose: () => void;
}

const OrderModal = ({ id, orderInfo, onClose }: OrderModalProps) => {
  const setUser = useSetRecoilState(userState);
  const [info, setInfo] = useState<GetTransportOrderByIdData | null>(orderInfo || null);

  useEffect(() => {
    if (!orderInfo) {
      TransportAPI.getDetailInfo(id)
        .then(([error, data]) => {
          if (error) {
            if (error.status === 401) {
              setUser(null);
            }
            throw Error(error.data?.statusText);
          }

          setInfo(data);
        })
        .catch(() => {
          onClose();
        });
    }
  }, [id, onClose, orderInfo, setUser]);

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
