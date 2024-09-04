import type { VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { deliveryStatusClass } from "./index.variants";
import Icon from "@/components/core/Icon";

// 'vehicleStatus' 속성의 정확한 타입 정의
type VehicleStatusType =
  | "default"
  | "WORK_START"
  | "WORK_WAITING"
  | "WORK_COMPLETED"
  | "MOVING"
  | "CANCELED"
  | "DELIVERY_DELAY"
  | "RESTING"
  | "RESTING_TIME";

interface DeliveryStatusTagProps extends VariantProps<typeof deliveryStatusClass> {
  children?: string;
  vehicleStatus: VehicleStatusType;
  restDisplay?: boolean;
}

// 상태값과 한국어 텍스트를 매핑한다.
const statusTextMap: Record<VehicleStatusType, string> = {
  // "TRANSPORTATION_START": "운송 시작",
  // "TRANSPORTATION_COMPLETED": "운송 완료",
  default: "",
  WORK_START: "작업시작",
  WORK_WAITING: "작업대기",
  WORK_COMPLETED: "작업완료",
  MOVING: "이동 중",
  RESTING: "휴게 중",
  DELIVERY_DELAY: "배송지연",
  CANCELED: "배송취소",
  RESTING_TIME: "60분",
};

const DeliveryStatusTag = ({
  vehicleStatus,
  background,
  children,
  restDisplay = true,
  ...props
}: DeliveryStatusTagProps) => {
  // 상태에 맞는 한국어 텍스트를 가져오기
  const statusText = statusTextMap[vehicleStatus] || "ERROR";

  return (
    <>
      <div className={cn(deliveryStatusClass({ vehicleStatus, background }))} {...props}>
        {statusText}
      </div>
      {restDisplay && vehicleStatus === "RESTING" && (
        <div className={cn(deliveryStatusClass({ vehicleStatus: "RESTING_TIME", background }))} {...props}>
          <Icon id="clock" size={14} />
          {statusTextMap.RESTING_TIME}
        </div>
      )}
    </>
  );
};

export default DeliveryStatusTag;
