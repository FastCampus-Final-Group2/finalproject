import { OrderInfo } from "@/types/order";
import Button from "@/components/core/Button";
import DispatchInfo from "./DispatchInfo";
import DestinationInfo from "./DestinationInfo";
import ClientInfo from "./ClientInfo";
import ModalBase from "@/components/detailModal/ModalBase";

interface OrderModalProps {
  info: OrderInfo;
  onClose: () => void;
}

const OrderModal = ({ info, onClose }: OrderModalProps) => {
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
