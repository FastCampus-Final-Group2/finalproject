export const ORDER_DETAIL_TEXT_MAP = {
  receivedDate: "주문접수일",
  transportOrderNumber: "운송장번호",
  deliveryType: "배송유형",
  requestedWorkDate: "작업희망일",
  requestedArrivalTime: "희망도착시간",
  estimatedWorkTime: "예상작업 소요시간",
  smName: "담당 기사",
  productName: "상품명",
  productCount: "수량",
  volume: "볼륨 (m3)",
  weight: "중량 (kg)",
  managerName: "담당자명",
  phoneNumber: "담당자연락처",
  deliveryDestinationCode: "배송처 코드",
} as const;

export const ORDER_DETAIL_DISPATCH_INFO_KEYS = [
  { key: "receivedDate", line: 2 },
  { key: "transportOrderNumber", line: 2 },
  { key: "deliveryType", line: 1 },
  { key: "requestedWorkDate", line: 2 },
  { key: "requestedArrivalTime", line: 2 },
  { key: "estimatedWorkTime", line: 2 },
  { key: "smName", line: 2 },
  { key: "productName", line: 2 },
  { key: "productCount", line: 2 },
  { key: "volume", line: 2 },
  { key: "weight", line: 2 },
] as const;

export const ORDER_DETAIL_DELIVERY_INFO_KEYS = [
  { key: "managerName", line: 2 },
  { key: "phoneNumber", line: 2 },
  { key: "deliveryDestinationCode", line: 1 },
] as const;
