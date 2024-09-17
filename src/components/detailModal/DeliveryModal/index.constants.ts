export const DELIVERY_INFO_LABEL = {
  default: {
    adminName: "담당자명",
    phoneNumber: "연락처",
    zipCode: "우편번호",
    "latitude/longitude": "위도 / 경도",
    address: "상세주소",
    detailAddress: "",
  },
  destination: {
    deliveryDestinationId: "배송처 코드",
    destinationName: "배송처명",
  },
  center: {
    centerId: "센터 코드",
    centerName: "센터명",
  },
} as const;

export const DELIVERY_INFO_KEYS = {
  default: [
    { key: "adminName", line: 1 },
    { key: "phoneNumber", line: 1 },
    { key: "zipCode", line: 1 },
    { key: "latitude/longitude", line: 1 },
    { key: "address", line: 2 },
    { key: "detailAddress", line: 1 },
  ],
  destination: [
    { key: "deliveryDestinationId", line: 1 },
    { key: "destinationName", line: 1 },
  ],
  center: [
    { key: "centerId", line: 1 },
    { key: "centerName", line: 1 },
  ],
} as const;

export const AFFILIATION_CENTER_INFO_LABEL = {
  centerCode: "센터코드",
  centerName: "센터명",
  address: "주소",
} as const;
