import { OrderDetail } from "@/types/order";
import Dimmed from "@/components/core/Dimmed";
import DispatchInfo from "./DispatchInfo";
import Button from "@/components/core/Button";
import ClientInfo from "./ClientInfo";
import DestinationInfo from "./DestinationInfo";

interface OrderDetailModalProps {
  info: OrderDetail;
  onClose: () => void;
}

const OrderDetailModal = ({ info, onClose }: OrderDetailModalProps) => {
  return (
    <Dimmed>
      <div className="flex w-[740px] flex-col items-center gap-5 rounded-lg bg-blue-30 p-7">
        <div className="self-start text-H-28-B">주문 정보</div>
        <DispatchInfo info={info} />
        {info.destinationInfo && <DestinationInfo info={info.destinationInfo} />}
        {info.clientInfo && <ClientInfo info={info.clientInfo} />}
        <div className="flex w-full justify-end">
          <Button size="s" shape="text" intent="secondary" onClick={() => onClose()}>
            닫기
          </Button>
        </div>
      </div>
    </Dimmed>
  );
};

export default OrderDetailModal;
