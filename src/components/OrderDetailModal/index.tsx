import { OrderDetail } from "@/types/order";
import Dimmed from "@/components/core/Dimmed";
import DispatchInfo from "./DispatchInfo";
import Button from "@/components/core/Button";
import DeliveryInfo from "./DeliveryInfo";

interface OrderDetailModalProps {
  data: OrderDetail;
  onClose: () => void;
}

const OrderDetailModal = ({ data, onClose }: OrderDetailModalProps) => {
  return (
    <Dimmed>
      <div className="flex w-[740px] flex-col items-center gap-5 rounded-lg bg-blue-30 p-7">
        <div className="self-start text-H-28-B">주문 정보</div>
        <DispatchInfo info={data} />
        <DeliveryInfo
          info={{
            managerName: "홍길동",
            phoneNumber: "01012345678",
            deliveryDestinationCode: 154851,
          }}
        />
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
