export const ORDER_DISPATCH_INFO_LABEL = {
  orderDate: "주문접수일",
  shipmentNumber: "운송장번호",
  deliveryType: "배송유형",
  requestedWorkDate: "작업희망일",
  requestedArrivalTime: "희망도착시간",
  estimatedWorkTime: "예상작업 소요시간",
  smName: "담당 기사",
  productName: "상품명",
  productCount: "수량",
  volume: "볼륨 (m3)",
  weight: "중량 (kg)",
} as const;

export const ORDER_DISPATCH_INFO_KEYS = [
  { key: "orderDate", line: 1 },
  { key: "shipmentNumber", line: 1 },
  { key: "deliveryType", line: 3 },
  { key: "requestedWorkDate", line: 1 },
  { key: "requestedArrivalTime", line: 1 },
  { key: "estimatedWorkTime", line: 1 },
  { key: "smName", line: 1 },
  { key: "productName", line: 1 },
  { key: "productCount", line: 1 },
  { key: "volume", line: 1 },
  { key: "weight", line: 1 },
] as const;

export const ORDER_DELIVERY_INFO_LABEL = {
  managerName: "담당자명",
  phoneNumber: "담당자연락처",
  deliveryDestinationCode: "배송처 코드",
} as const;

export const ORDER_DELIVERY_INFO_KEYS = [
  { key: "managerName", line: 1 },
  { key: "phoneNumber", line: 1 },
  { key: "deliveryDestinationCode", line: 3 },
] as const;

export const ORDER_CLIENT_INFO_LABEL = {
  clientName: "고객명",
  phoneNumber: "고객연락처",
  roadAddress: "주소",
  detailAddress: "",
  note: "고객전달사항",
} as const;

export const ORDER_CLIENT_INFO_KEYS = [
  { key: "clientName", line: 1 },
  { key: "phoneNumber", line: 1 },
  { key: "roadAddress", line: 2 },
  { key: "detailAddress", line: 1 },
  { key: "note", line: 3 },
] as const;
