import { GetTransportOrderByIdData, LocalTime } from "@/models/ApiTypes";

export const ORDER: GetTransportOrderByIdData = {
  orderDate: "2023-11-02",
  shipmentNumber: "20240808274985",
  deliveryType: "지입",
  requestedWorkDate: "2024-08-19",
  requestedArrivalTime: "00:30:00" as LocalTime,
  estimatedWorkTime: "00:30:00" as LocalTime,
  smName: "홍길동",
  productName: "사과",
  productCount: 4,
  volume: 80.5,
  weight: 80.1,
  destinationInfo: {
    managerName: "유관순",
    phoneNumber: "010-1111-2222",
    deliveryDestinationCode: 4,
  },
  clientInfo: {
    clientName: "홍길동",
    phoneNumber: "010-1234-5678",
    roadAddress: "충남 논산시 중앙대로 374번길 41-11",
    detailAddress: "1층 물류센터",
    note: "조심히 다뤄주세요.",
  },
};

// export const ORDER: OrderInfo = {
//   receivedDate: "2024.08.11", // 주문접수일
//   transportOrderNumber: "C0029384889", // 운송장 번호
//   deliveryType: "지입", // 배송유형
//   requestedWorkDate: "2023-11-02", // 작업희망일
//   requestedArrivalTime: "16:00-18:00", // 희망도착시간
//   estimatedWorkTime: "00:01", // 예상작업 소요시간
//   smName: "이서원", // 담당드라이버
//   productName: "스탠리텀블러", // 상품명
//   productCount: 5, // 수량
//   volume: 600, // 볼륨
//   weight: 50, // 중량
//   destinationInfo: {
//     managerName: "홍길동", // 담당자명
//     phoneNumber: "01012345678", // 담당자연락처
//     deliveryDestinationCode: 154851, // 배송처 코드
//   },
//   clientInfo: {
//     client: "나다",
//     phoneNumber: "00000000000",
//     roadAddress: "저기",
//     detailAddress: "여기",
//     note: "뭐라뭐라",
//   },
// };
