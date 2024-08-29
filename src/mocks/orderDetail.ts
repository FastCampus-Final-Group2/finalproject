import { OrderDetail } from "@/types/order";

export const ORDER_DETAIL: OrderDetail = {
  receivedDate: "2024.08.11", // 주문접수일
  transportOrderNumber: "C0029384889", // 운송장 번호
  deliveryType: "지입", // 배송유형
  requestedWorkDate: "2023-11-02", // 작업희망일
  requestedArrivalTime: "16:00-18:00", // 희망도착시간
  estimatedWorkTime: "00:01", // 예상작업 소요시간
  smName: "이서원", // 담당드라이버
  productName: "스탠리텀블러", // 상품명
  productCount: 5, // 수량
  volume: 600, // 볼륨
  weight: 50, // 중량
  managerName: "홍길동", // 담당자명
  phoneNumber: "01012345678", // 담당자연락처
  deliveryDestinationCode: 154851, // 배송처 코드
};
